import { defineConfig } from "@ice/app";

export default defineConfig(() => ({
  minify: false,
  server: { onDemand: true, format: "esm" },
  alias: { "@/*": "./src/*" },
  ssg: false,
  ssr: false,
  routes: {
    defineRoutes: (routes) => {
      routes("", "generated/index/index.tsx");
      // routes("/", "layout.tsx", () => {
      //   routes("", "generated/index/index.tsx");
      // });
      // routes("/gen", "generated/index/index.tsx");
    },
  },
}));
