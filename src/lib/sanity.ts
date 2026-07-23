import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: true, // fast reads via Sanity CDN
  // token: import.meta.env.SANITY_API_TOKEN, // uncomment for private datasets
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getPageContent(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      hero { heading, subheading, ctaLabel, ctaHref },
      sections[]{ _type, heading, body, image }
    }`,
    { slug }
  );
}

export async function getBusinessInfo() {
  return sanityClient.fetch(
    `*[_type == "businessInfo"][0]{
      name, tagline, email, phone, address,
      openingHours, socialLinks
    }`
  );
}

export async function getGalleryItems() {
  return sanityClient.fetch(
    `*[_type == "galleryItem"] | order(_createdAt desc){
      _id, title, description, image, category
    }`
  );
}
