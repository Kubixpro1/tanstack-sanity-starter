import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["cake", "pastry", "seasonal", "custom"],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
