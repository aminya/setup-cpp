import module from "module"
import { type TerserOptions, defineConfig } from "vite"
import babel from "vite-plugin-babel"
import terserRc from "./.terserrc.mjs"
import babelConfig from "./babel.config.mts"

const isLegacy = process.env.TARGET === "legacy"

const viteConfig = defineConfig({
  build: {
    ssr: "./src/setup-cpp.ts",
    outDir: isLegacy ? "./dist/legacy" : "./dist/modern",
    target: isLegacy ? "node12" : "node20",
    minify: "terser",
    terserOptions: terserRc as TerserOptions,
    sourcemap: true,
    rollupOptions: {
      output: {
        format: isLegacy
          ? "cjs"
          : "es",
      },
    },
    emptyOutDir: process.env.NODE_ENV === "production",
  },
  resolve: {
    alias: {
      ...(isLegacy
        ? {
          "fs/promises": "./src/utils/compat/fs/promises.ts",
          "stream/promises": "./src/utils/compat/stream/promises.ts",
          "stream/web": "web-streams-polyfill/dist/ponyfill.mjs",
          "util/types": "util.types/index.js",
          "timers/promises": "timers-browserify",
          diagnostics_channel: "diagnostics_channel/index.js",
        }
        : {}),
    },
  },
  ssr: {
    target: "node",
    noExternal: true,
    external: module.builtinModules,
  },
  plugins: isLegacy
    ? [
      babel({
        babelConfig,
      }),
    ]
    : [],
})

export default viteConfig
