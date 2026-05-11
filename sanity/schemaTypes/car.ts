import { defineType, defineField } from 'sanity'

export const car = defineType({
  name: 'car',
  title: 'Car Listing',
  type: 'document',
  fields: [
    // --- TITLE & SLUG ---
    defineField({
      name: 'title',
      title: 'Listing Title',
      type: 'string',
      description: 'e.g., Honda City 5 Seater Car',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    // --- NEW: AVAILABILITY STATUS ---
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      initialValue: 'available', // New cars start as Available
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
        ],
        layout: 'radio', // Makes it easy to click in the Studio
      },
    }),

    // --- BASIC IDENTIFICATION ---
    defineField({
      name: 'make',
      title: 'Make',
      type: 'string',
      description: 'e.g., Audi, Honda',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      description: 'e.g., A1, Civic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),

    // --- TECHNICAL SPECS ---
    defineField({
      name: 'engine',
      title: 'Engine',
      type: 'string',
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage',
      type: 'number',
    }),
    defineField({
      name: 'gearbox',
      title: 'Gearbox',
      type: 'string',
    }),
    defineField({
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: { list: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
    }),

    // --- PHYSICAL DETAILS ---
    defineField({
      name: 'bodyType',
      title: 'Body Type',
      type: 'string',
      options: { list: ['Hatchback', 'Sedan', 'SUV', 'Coupe', 'Convertible'] },
    }),
    defineField({
      name: 'doors',
      title: 'Number of Doors',
      type: 'number',
      options: { list: [2, 3, 4, 5] },
    }),
    defineField({
      name: 'color',
      title: 'Exterior Color',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    
    // --- MEDIA ---
    defineField({
      name: 'images',
      title: 'Car Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})