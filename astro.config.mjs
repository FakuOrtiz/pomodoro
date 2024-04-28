import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import worker from "@astropub/worker";

export default defineConfig({
  integrations: [tailwind(), preact(), worker(),]
});