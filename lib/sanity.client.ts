import { createClient } from '@sanity/client';
// 1. Change this to a named import
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: process.env.NODE_ENV === 'production',
});

// 2. Update the function call here
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}