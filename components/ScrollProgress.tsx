'use client'; // This MUST be the very first line
import { useEffect, useState } from "react";

export default function MoveTopButton() {
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
            setScrollProgress((window.pageYOffset / totalScroll) * 100);
        }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div 
        className="fixed top-0 left-0 h-1.5 bg-red-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
  )
}
