import { client } from '@/lib/sanity.client'
import { SINGLE_CAR_QUERY, CAR_SLUGS_QUERY } from '@/lib/sanity.queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'

// Generate static paths at build time (optional but recommended)
export async function generateStaticParams() {
  const slugs = await client.fetch(CAR_SLUGS_QUERY)
  return slugs.map(({ slug }: { slug: string }) => ({ slug }))
}

async function getCar(slug: string) {
  return await client.fetch(SINGLE_CAR_QUERY, { slug })
}

export default async function CarDetailPage({ params }: { params: { slug: string } }) {
  const car = await getCar(params.slug)
  
  if (!car) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            {car.images?.[0]?.asset?.url && (
              <Image
                src={car.images[0].asset.url}
                alt={car.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {car.images?.slice(1).map((img: any, idx: number) => (
              <div key={idx} className="relative h-24 w-full rounded overflow-hidden">
                <Image
                  src={img.asset.url}
                  alt={`${car.title} - ${idx + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
          <p className="text-gray-500 mb-4">{car.year} {car.make} {car.model}</p>
          <p className="text-3xl text-green-600 font-bold mb-6">
            ${car.price.toLocaleString()}
          </p>
          
          <div className="grid grid-cols-2 gap-4 border-t pt-4 mb-6">
            <div>
              <span className="text-gray-500">Mileage</span>
              <p className="font-semibold">{car.mileage?.toLocaleString()} miles</p>
            </div>
            <div>
              <span className="text-gray-500">Transmission</span>
              <p className="font-semibold">{car.transmission}</p>
            </div>
            <div>
              <span className="text-gray-500">Fuel Type</span>
              <p className="font-semibold">{car.fuelType}</p>
            </div>
            <div>
              <span className="text-gray-500">Body Type</span>
              <p className="font-semibold">{car.bodyType}</p>
            </div>
            <div>
              <span className="text-gray-500">Color</span>
              <p className="font-semibold">{car.color}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{car.description}</p>
          </div>

          {car.features && car.features.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside grid grid-cols-2 gap-1">
                {car.features.map((feature: string, idx: number) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}