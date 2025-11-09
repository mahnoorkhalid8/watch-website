export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Product Name" },
    { name: "description", type: "text", title: "Description" },
    { name: "price", type: "number", title: "Price" },
    { name: "discountedPrice", type: "number", title: "Discounted Price" },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: { list: ["men", "women", "kids"] },
    },
    { name: "featuredOnLanding", type: "boolean", title: "Featured on Landing" },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name", maxLength: 96 },
    },
    { name: "image", type: "image", title: "Product Image", options: { hotspot: true } },
  ],
};
