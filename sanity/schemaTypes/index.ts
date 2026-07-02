import { type SchemaTypeDefinition } from 'sanity'
import { car } from './car'
import { review } from './review'

export const schemaTypes = [car, review]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [car, review],
}
