export default {
    name: "watch",
    title: "Watch",
    typ: "document",
    fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
        { name: "description", title: "Description", type: "text" },
        { name: "price", title: "Price", type: "number" },
        { name: "discountedPrice", title: "Discounted Price", type: "number" },
        { name: "category", title: "Category", type: "string", options: {list: ["men", "women", "kids"] } },
        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
        { name: "featuredOnLanding", title: "Featured On Landidng", type: "boolean" }
    ]
}