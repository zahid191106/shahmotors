'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CarImageSliderProps {
  images?: Array<{ asset?: { url?: string } }>;
  title: string;
  isSold: boolean;
}

export default function CarImageSlider({ images = [], title, isSold }: CarImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;
  const activeImage = images[activeIndex]?.asset?.url;

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!hasImages) {
    return (
      <div className="relative group">
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-200 shadow-xl border-4 border-white">
          <div className="w-full h-full flex items-center justify-center text-gray-400">Image Unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {isSold && (
        <div className="absolute top-8 right-8 z-10 animate-in fade-in zoom-in duration-700 scale-110 md:scale-150">
          <svg width="100" height="100" viewBox="0 0 400 400" className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-95" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="redGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="100%" stopColor="#8b0000" />
              </radialGradient>
            </defs>
            <g transform="rotate(-15 200 200)">
              <polygon
                points="200,25 225,70 275,45 285,95 335,85 320,135 370,155 335,195 375,230 325,245 340,295 290,290 280,340 230,315 200,370 170,315 120,340 110,290 60,295 75,245 25,230 65,195 30,155 80,135 65,85 115,95 125,45 175,70"
                fill="url(#redGrad)"
                stroke="#fff"
                strokeWidth="12"
              />
              <text x="200" y="225" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="76" fontWeight="900" fill="white">
                SOLD
              </text>
            </g>
          </svg>
        </div>
      )}

      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-200 shadow-xl border-4 border-white">
        {activeImage ? (
          <Image
            src={activeImage}
            alt={`${title} view ${activeIndex + 1}`}
            fill
            className={`object-cover transition-all duration-700 ${isSold ? 'grayscale-[0.6] brightness-50 contrast-125' : 'group-hover:scale-105'}`}
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">Image Unavailable</div>
        )}

        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-700 shadow-lg transition hover:bg-white"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-700 shadow-lg transition hover:bg-white"
          aria-label="Next image"
        >
          ›
        </button>
      </div>

      {images.length > 1 && (
        <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          {images.map((img, idx) => {
            const thumbUrl = img.asset?.url;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative h-20 w-28 md:h-24 md:w-32 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all shadow-sm bg-white ${idx === activeIndex ? 'border-red-600' : 'border-transparent hover:border-red-600'}`}
                aria-label={`Show image ${idx + 1}`}
              >
                {thumbUrl ? (
                  <Image
                    src={thumbUrl}
                    alt={`${title} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
