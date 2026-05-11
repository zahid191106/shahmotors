'use client'; // This MUST be the very first line
import { useEffect, useState } from "react";

export default function MoveTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
        onClick={handleClick}
        aria-label="Move to top"
        className={`fixed z-50 bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg transition-opacity duration-300 hover:bg-red-700 focus:outline-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ boxShadow: '0 8px 24px rgba(255, 0, 0, 0.15)' }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
    </button>
  ) : null;
}
