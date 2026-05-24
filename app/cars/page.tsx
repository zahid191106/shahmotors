import { client } from '@/lib/sanity.client'
import { ALL_CARS_QUERY } from '@/lib/sanity.queries'
import CarGrid from '@/components/CarGrid'
import FilterSidebar from '@/components/FilterSidebar'
import Navbar from '@/components/Navbar'
import { Suspense } from 'react'
import Footer from '@/components/Footer'

async function getAllCars() {
  return await client.fetch(ALL_CARS_QUERY)
}

export default async function CarsPage({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
  const allCars = await getAllCars()

  // 1. Fetch raw data from Sanity
  const rawData = await client.fetch(`{
    "makes": *[_type == "car" && defined(make)].make,
    "models": *[_type == "car" && defined(model)].model
  }`);

  // 2. Clean up the lists using JavaScript (Removes duplicates, spaces, and handles case)
  const cleanList = (arr: string[]) => 
    Array.from(new Set(arr.map(item => item.trim()))) // Remove extra spaces and duplicates
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'accent' })); // Professional A-Z sort

  const makes = cleanList(rawData.makes);
  const models = cleanList(rawData.models);

  // Apply filters based on searchParams (client-side or server-side)
  // For simplicity, we'll filter on the client later, but you can also filter via GROQ.

  return (
    <>
      <div className="relative min-h-[90vh] bg-gray-100 flex flex-col items-center justify-center px-2 md:px-4 pb-12 md:pb-20 overflow-hidden">

        <section
          className="relative max-w-7xl min-h-[400px] flex items-center overflow-hidden rounded-b-xl bg-white pt-5">
          <Navbar />

          { }
          {/* This creates the large pinkish circle shape in the background behind the car */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] md:w-[60%] h-[80%] bg-[#fdf2f2] rounded-l-full -z-0 translate-x-20 md:translate-x-32" />

          { }
          {/* The ghost text "NISSAN GTR" that sits behind the content */}
          <div
            className="absolute left-10 top-1/4 select-none pointer-events-none opacity-[0.03] font-black text-8xl md:text-[12rem] leading-none -z-0">
            SHAHMOTORS <br /> COLLECTION
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-3 md:px-6 pt-20 pb-10 md:pb-5 relative z-10">

            { }
            <div className="flex flex-col space-y-6 text-center md:text-start order-2 lg:order-1">
              <p className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">Premium Used Cars Ireland</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Find Your Perfect Quality Used Car
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Explore Ireland's premier selection of certified pre-owned vehicles. Every car in our 
                inventory undergoes a rigorous mechanical inspection, a comprehensive background history check, 
                and a full professional valet, ensuring you drive away with total peace of mind.
              </p>

              {/* Decorative Divider */}
              <div className="flex justify-center items-center space-x-3 opacity-30">
                <div className="w-12 h-1 bg-red-600"></div>
                <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                </div>
                <div className="w-12 h-1 bg-red-600"></div>
              </div>
              { }
            </div>

            { }
            <div className="relative order-1 lg:order-2 flex justify-center items-center">
              {/* Main Car Image - Using a high-quality transparent vehicle image */}
              <img src="./images/pic8.png"
                alt="Silver Luxury Sports Car" className="w-full h-auto drop-shadow-2xl z-20 object-contain max-w-[700px]" />

              {/* Subtle Shadow under car */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/10 blur-xl rounded-[100%] -z-10" />
            </div>

          </div>
        </section>
        <section className="relative w-full max-w-7xl flex items-center overflow-hidden pt-5">
          <div className="w-full text-center space-y-6">          

            {/* Filter Sidebar */}
            <div className="flex flex-wrap justify-center gap-4 py-12">
                <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-xl" />}>
                  {/* This is your actual component that contains your logic */}
                  <FilterSidebar
                    dynamicMakes={makes} 
                    dynamicModels={models}
                  />
              </Suspense>
            </div>

            {/* Car Grid */}
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-xl" />}>
              {/* This is your actual car grid */}
              <CarGrid allCars={allCars} />
          </Suspense>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}