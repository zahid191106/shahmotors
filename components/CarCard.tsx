import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'

export default function CarCard({ car }: { car: any }) {
  return (
    <Link href={`/cars/${car.slug.current}`}>
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        {car.images?.[0]?.asset?.url && (
          <div className="relative h-48 w-full">
            <Image
              src={car.images[0].asset.url}
              alt={car.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-bold">{car.title}</h3>
          <p className="text-gray-600">{car.year} {car.make} {car.model}</p>
          <p className="text-green-600 font-bold text-lg mt-2">
            ${car.price.toLocaleString()}
          </p>
          <div className="mt-2 flex gap-2 text-sm text-gray-500">
            <span>{car.mileage?.toLocaleString()} mi</span>
            <span>•</span>
            <span>{car.transmission}</span>
            <span>•</span>
            <span>{car.fuelType}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}