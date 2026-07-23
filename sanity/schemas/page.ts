import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
        defineField({ name: "ctaLabel", title: "Button Label", type: "string" }),
        defineField({ name: "ctaHref", title: "Button Link", type: "string" }),
        defineField({ name: "image", title: "Background Image", type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "textSection",
          title: "Text Section",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
          ],
        },
        {
          type: "object",
          name: "imageTextSection",
          title: "Image + Text Section",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
            defineField({ name: "image", type: "image", options: { hotspot: true } }),
            defineField({ name: "imagePosition", type: "string", options: { list: ["left", "right"] } }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: `/${slug}` };
    },
  },
});
