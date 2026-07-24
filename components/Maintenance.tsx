import React from 'react';

const Maintenance: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-4">
        {/* Maintenance Video */}
        <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          >
            <source src="/images/maintenance.mp4" type="video/mp4" />
            <source src="/images/maintenance.mp4" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            The Site Under Maintenance
          </h1>
          <p className="mx-auto max-w-lg text-base text-slate-600 sm:text-lg">
            We are currently performing scheduled maintenance to improve our platform.
            Please check back soon!
          </p>
        </div>

        {/* Status Badge */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Estimated downtime: ~2 hours
          </div>
        </div>
      </div>
    </main>
  );
};

export default Maintenance;