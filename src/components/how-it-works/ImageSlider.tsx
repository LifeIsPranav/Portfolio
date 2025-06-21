
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, Move } from 'lucide-react';

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
  altText: string;
  className?: string;
}

const ImageSlider = ({
  beforeImage,
  afterImage,
  altText,
  className = ""
}: ImageSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const newPosition = (clientX - rect.left) / rect.width * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [isDragging, updateSliderPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  }, [updateSliderPosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    updateSliderPosition(touch.clientX);
  }, [updateSliderPosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div 
      ref={sliderRef} 
      className={`relative rounded-2xl overflow-hidden border border-gray-300/30 dark:border-gray-600/30 shadow-xl bg-white dark:bg-gray-800 select-none transition-all duration-200 ${isHovered ? 'shadow-2xl' : ''} ${className}`}
      style={{ userSelect: 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Before Image */}
      <div 
        className="absolute inset-0 select-none" 
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          userSelect: 'none'
        }}
      >
        <img 
          src={beforeImage} 
          alt={`Before: ${altText}`} 
          className="w-full h-full select-none object-cover"
          style={{ userSelect: 'none' }} 
          draggable={false} 
        />
        
        {/* Before Label */}
        <div className="absolute top-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          The Interface
        </div>
      </div>

      {/* After Image */}
      <div 
        className="absolute inset-0 select-none" 
        style={{
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
          userSelect: 'none'
        }}
      >
        <img 
          src={afterImage} 
          alt={`After: ${altText}`} 
          className="w-full h-full object-cover select-none" 
          style={{ userSelect: 'none' }} 
          draggable={false} 
        />
        
        {/* After Label */}
        <div className="absolute top-3 right-3 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          How I engineered it
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-convrt-purple cursor-col-resize z-10 select-none"
        style={{
          left: `${sliderPosition}%`,
          userSelect: 'none',
          transform: 'translateX(-50%)'
        }} 
      >
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg flex items-center justify-center select-none transition-all duration-200 ${
          isHovered || isDragging ? 'w-10 h-10 bg-convrt-purple' : 'w-8 h-8 bg-white border-2 border-convrt-purple'
        }`}>
          {isHovered || isDragging ? (
            <Move className="w-4 h-4 text-white" />
          ) : (
            <ChevronRight className="w-3 h-3 text-convrt-purple" />
          )}
        </div>
      </div>

      {/* Instruction text */}
      {!isDragging && !isHovered && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm opacity-60 pointer-events-none">
          Drag to compare
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
