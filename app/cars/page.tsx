import { client } from '@/lib/sanity.client'
import { ALL_CARS_QUERY } from '@/lib/sanity.queries'
import CarGrid from '@/components/CarGrid'
import FilterSidebar from '@/components/FilterSidebar'
import Navbar from '@/components/Navbar'

async function getAllCars() {
  return await client.fetch(ALL_CARS_QUERY)
}

export default async function CarsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const allCars = await getAllCars()

  // Apply filters based on searchParams (client-side or server-side)
  // For simplicity, we'll filter on the client later, but you can also filter via GROQ.

  return (
    <div className="relative min-h-[90vh] bg-gray-100 flex flex-col items-center justify-center px-4 pb-12 md:pb-20 overflow-hidden">

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

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 pt-20 relative z-10">

          { }
          <div className="flex flex-col space-y-6 text-center md:text-start order-2 lg:order-1">
            <p className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">Top Rated Dealer</p>
            <h2 className="text-5xl font-black tracking-tight">
              Choose The Best Quality Cars With Us
            </h2>
            <p className="text-lg text-slate-600">
              Discover the perfect blend of performance and luxury with our premium car selection.
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
            <FilterSidebar />
          </div>

          {/* Car Grid */}
          <CarGrid allCars={allCars} />
        </div>
      </section>
    </div>
  )
}