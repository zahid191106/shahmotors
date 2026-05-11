'use client';

import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WishlistButton({ carId }) {
  const [isSaved, setIsSaved] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsSaved(savedCars.includes(carId));
  }, [carId]);

  const toggleWishlist = () => {
    const savedCars = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let updatedCars;

    if (isSaved) {
      // Remove from wishlist
      updatedCars = savedCars.filter((id) => id !== carId);
      setIsSaved(false);
    } else {
      // Add to wishlist
      updatedCars = [...savedCars, carId];
      setIsSaved(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedCars));
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2.5 rounded-full transition-all duration-300 active:scale-90 ${
        isSaved 
          ? 'bg-red-50 text-red-600' 
          : 'hover:bg-gray-100 text-gray-500'
      }`}
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart 
        size={20} 
        // fill is a standard SVG prop that works with Lucide
        fill={isSaved ? "currentColor" : "none"} 
        className={isSaved ? "animate-pulse" : ""}
      />
    </button>
  );
}