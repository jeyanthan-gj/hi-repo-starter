import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
}

interface Gallery3DSlideshowProps {
  images: GalleryPhoto[];
}

function ImagePlane({ 
  image, 
  position, 
  rotation, 
  scale = 1,
  isActive = false 
}: { 
  image: GalleryPhoto;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  isActive?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, image.image_url);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      // Subtle floating animation for active image
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial 
          map={texture} 
          transparent
          opacity={isActive ? 1 : 0.7}
        />
      </mesh>
      {isActive && (
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {image.title}
        </Text>
      )}
    </group>
  );
}

function Scene({ 
  images, 
  currentIndex, 
  autoRotate 
}: { 
  images: GalleryPhoto[];
  currentIndex: number;
  autoRotate: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.2;
      } else {
        // Smooth rotation to show current image
        const targetRotation = -currentIndex * (Math.PI * 2) / images.length;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetRotation,
          delta * 3
        );
      }
    }
  });

  if (images.length === 0) {
    return (
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="#888888"
        anchorX="center"
        anchorY="middle"
      >
        No images in gallery
      </Text>
    );
  }

  return (
    <group ref={groupRef}>
      {images.map((image, index) => {
        const angle = (index / images.length) * Math.PI * 2;
        const radius = Math.max(4, images.length * 0.8);
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const rotationY = -angle;

        return (
          <ImagePlane
            key={image.id}
            image={image}
            position={[x, 0, z]}
            rotation={[0, rotationY, 0]}
            scale={currentIndex === index ? 1.2 : 1}
            isActive={currentIndex === index && !autoRotate}
          />
        );
      })}
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
    </group>
  );
}

export const Gallery3DSlideshow: React.FC<Gallery3DSlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && images.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const handlePrevious = () => {
    setAutoRotate(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setAutoRotate(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
    if (autoRotate) {
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setAutoRotate(false);
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-gradient-to-br from-background to-muted">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={20}
          autoRotate={false}
        />
        <Scene 
          images={images}
          currentIndex={currentIndex}
          autoRotate={autoRotate}
        />
      </Canvas>

      {/* Control Panel */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={images.length === 0}
          className="text-white hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayPause}
          disabled={images.length === 0}
          className="text-white hover:text-primary"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          disabled={images.length === 0}
          className="text-white hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-white/30 mx-2" />

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAutoRotate}
          disabled={images.length === 0}
          className={`text-white hover:text-primary ${autoRotate ? 'text-primary' : ''}`}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        {images.length > 0 && (
          <span className="text-white text-sm ml-2">
            {currentIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Image Info Panel */}
      {!autoRotate && images.length > 0 && (
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-xs">
          <h3 className="text-white font-semibold text-lg mb-1">
            {images[currentIndex]?.title}
          </h3>
          {images[currentIndex]?.description && (
            <p className="text-gray-300 text-sm">
              {images[currentIndex].description}
            </p>
          )}
          {images[currentIndex]?.category && (
            <div className="mt-2">
              <span className="inline-block bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                {images[currentIndex].category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
        <p className="mb-1">🖱️ Drag to rotate view</p>
        <p className="mb-1">🔍 Scroll to zoom</p>
        <p>⏯️ Use controls to navigate</p>
      </div>
    </div>
  );
};