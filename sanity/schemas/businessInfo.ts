import { defineField, defineType } from "sanity";

export const businessInfo = defineType({
  name: "businessInfo",
  title: "Business Info",
  type: "document",
  // Only one of these should ever exist
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "name", title: "Business Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "days", title: "Days", type: "string", placeholder: "Mon–Fri" }),
            defineField({ name: "hours", title: "Hours", type: "string", placeholder: "9:00–18:00" }),
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok URL", type: "url" }),
      ],
    }),
  ],
});
