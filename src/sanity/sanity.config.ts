import product from './schemas/product';

export const schemaTypes = [product];

import { defineConfig } from "sanity";

export default defineConfig({
  name: "default",
  title: "Watch Website Studio",
  projectId: "5601ix16",
  dataset: "production",
  schema: {
    types: schemaTypes,
  },
});

// import { defineConfig } from "sanity";
// import { structureTool } from "sanity/structure";
// import { schemaTypes } from "./schemaTypes";

// export default defineConfig({
//   name: "default",
//   title: "Watch Website Studio",
//   projectId: "5601ix16",
//   dataset: "production",
//   plugins: [structureTool()],
//   schema: {
//     types: schemaTypes,
//   },
// });
