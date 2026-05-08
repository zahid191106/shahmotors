import { groq } from 'next-sanity'


export const ALL_CARS_QUERY = groq`*[_type == "car"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  availability,
  make,
  model,
  year,
  price,
  engine,
  mileage,
  gearbox,
  fuelType,
  bodyType,
  doors,
  color,
  images[0] {
    asset->{
      url
    }
  },
  isFeatured
}`


export const FEATURED_CARS_QUERY = groq`*[_type == "car" && isFeatured == true] | order(_createdAt desc)[0...6] {
  _id,
  title,
  slug,
  availability,
  make,
  model,
  year,
  price,
  engine,
  mileage,
  gearbox,
  fuelType,
  bodyType,
  doors,
  color,
    images[0] {
    asset->{
      url
    }
  }
}`

export const SINGLE_CAR_QUERY = groq`*[_type == "car" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  availability,
  make,
  model,
  year,
  price,
  engine,
  mileage,
  gearbox,
  fuelType,
  bodyType,
  doors,
  color,
  description,
  features,
  images[]{
    asset->{url, metadata{lqip, dimensions}}
  }
}`

export const CAR_SLUGS_QUERY = groq`*[_type == "car" && defined(slug.current)] {
  "slug": slug.current
}`