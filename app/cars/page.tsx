import { client } from '@/lib/sanity.client'
import { ALL_CARS_QUERY } from '@/lib/sanity.queries'
import CarCard from '@/components/CarCard'
import FilterSidebar from '@/components/FilterSidebar'

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <FilterSidebar />
        </aside>
        <main className="md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCars.map((car: any) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}