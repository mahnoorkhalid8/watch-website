// import { type SchemaTypeDefinition } from 'sanity'

// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [],
// }

import watch from './watch'
import product from "@/sanity/schemas/product";

export const schemaTypes = [watch]

export const schema = {
  types: [product]
};
