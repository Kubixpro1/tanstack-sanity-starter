import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

// These values come from .env.local — never hardcode them here
const projectId = process.env.SANITY_STUDIO_PROJECT_ID!;
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "My Business CMS",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(), // remove in production if you don't need the GROQ explorer
  ],
  schema: {
    types: schemaTypes,
  },
});
