import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
}

interface Gallery2DSlideshowProps {
  images: GalleryPhoto[];
}

export const Gallery2DSlideshow: React.FC<Gallery2DSlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && images.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[600px] rounded-lg bg-card border flex items-center justify-center">
        <p className="text-muted-foreground text-lg">No images in gallery</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-card border">
      {/* Main Image */}
      <div className="relative h-full">
        <img 
          src={currentImage.image_url}
          alt={currentImage.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Image Info */}
        <div className="absolute bottom-20 left-6 right-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{currentImage.title}</h3>
          {currentImage.description && (
            <p className="text-gray-300 text-lg mb-3">{currentImage.description}</p>
          )}
          {currentImage.category && (
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {currentImage.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          className="text-white hover:text-primary hover:bg-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayPause}
          className="text-white hover:text-primary hover:bg-white/20"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          className="text-white hover:text-primary hover:bg-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div className="w-px h-6 bg-white/30 mx-2" />

        <span className="text-white text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4">
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index 
                  ? 'border-primary scale-110' 
                  : 'border-white/30 hover:border-white/60'
              }`}
            >
              <img 
                src={image.image_url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary hover:bg-black/50 rounded-full w-12 h-12"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary hover:bg-black/50 rounded-full w-12 h-12"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};