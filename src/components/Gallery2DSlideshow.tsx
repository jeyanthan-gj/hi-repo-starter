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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && images.length > 1) {
      interval = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, images.length, currentIndex]);

  const transitionToImage = (newIndex: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setNextIndex(newIndex);
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 600);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    transitionToImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    transitionToImage(newIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[600px] rounded-lg bg-card border flex items-center justify-center animate-fade-in">
        <p className="text-muted-foreground text-lg">No images in gallery</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];
  const nextImage = images[nextIndex];

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-card border group">
      {/* Background Images Container */}
      <div className="relative h-full">
        {/* Current Image */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        >
          <img 
            src={currentImage.image_url}
            alt={currentImage.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Next Image (for smooth transition) */}
        {isTransitioning && (
          <div 
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <img 
              src={nextImage.image_url}
              alt={nextImage.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Enhanced Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        
        {/* Animated Progress Bar */}
        {isPlaying && (
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-75 ease-linear"
              style={{ 
                width: '100%',
                animation: isPlaying ? 'progress-bar 4s linear infinite' : 'none'
              }}
            />
          </div>
        )}
        
        {/* Image Info with Enhanced Animations */}
        <div className={`absolute bottom-20 left-6 right-6 text-white transform transition-all duration-700 ${
          isTransitioning ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`}>
          <h3 className="text-3xl font-bold mb-3 animate-fade-in" style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)' 
          }}>
            {currentImage.title}
          </h3>
          {currentImage.description && (
            <p className="text-gray-200 text-lg mb-4 animate-fade-in" style={{ 
              animationDelay: '0.2s',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)' 
            }}>
              {currentImage.description}
            </p>
          )}
          {currentImage.category && (
            <Badge 
              variant="secondary" 
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm animate-scale-in hover:bg-white/30 transition-all duration-300"
              style={{ animationDelay: '0.4s' }}
            >
              {currentImage.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 transition-all duration-300 hover:bg-black/80 hover:scale-105 ${
        isTransitioning ? 'translate-y-4 opacity-70' : 'translate-y-0 opacity-100'
      }`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevious}
          disabled={isTransitioning}
          className="text-white hover:text-primary hover:bg-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayPause}
          className="text-white hover:text-primary hover:bg-white/20 transition-all duration-300 hover:scale-110"
        >
          <div className="relative">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            {isPlaying && (
              <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
            )}
          </div>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleNext}
          disabled={isTransitioning}
          className="text-white hover:text-primary hover:bg-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div className="w-px h-6 bg-white/30 mx-2" />

        <span className="text-white text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrevious}
        disabled={isTransitioning}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-primary hover:bg-black/60 rounded-full w-14 h-14 transition-all duration-300 hover:scale-110 hover:shadow-xl opacity-0 group-hover:opacity-100 disabled:opacity-0 backdrop-blur-sm border border-white/20"
      >
        <ChevronLeft className="h-7 w-7" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-primary hover:bg-black/60 rounded-full w-14 h-14 transition-all duration-300 hover:scale-110 hover:shadow-xl opacity-0 group-hover:opacity-100 disabled:opacity-0 backdrop-blur-sm border border-white/20"
      >
        <ChevronRight className="h-7 w-7" />
      </Button>
    </div>
  );
};