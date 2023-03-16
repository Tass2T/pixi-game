import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      root: "./",
      publicDir: "./src/assets/",
      base: "./",
      server: {
        host: true,
      },
      build: {
        outDir: "./dist",
        emptyOutDir: true,
        sourcemap: true,
      },
    };
  } else {
    return {
      root: "./",
      publicDir: "./",
      base: "./",
      server: {
        host: true,
      },
      build: {
        outDir: "./dist",
        emptyOutDir: true,
        sourcemap: true,
      },
    };
  }
});
