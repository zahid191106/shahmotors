"use client";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-24 h-24 border-4 border-gray-100 rounded-full"></div>
        {/* Animated Spinner */}
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
        
        {/* Car Icon or Logo in center (Optional) */}
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="mt-8 text-center space-y-2">
        <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-gray-900">
          ShahMotors
        </h2>
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">
          Finding your perfect car...
        </p>
      </div>
    </div>
  );
}