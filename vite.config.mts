import module from "module"
import { type TerserOptions, defineConfig } from "vite"
import babel from "vite-plugin-babel"
import terserRc from "./.terserrc.mjs"
import babelConfig from "./babel.config.mts"

const viteConfig = defineConfig((configEnv) => {
  const isLegacy = configEnv.mode.includes("legacy")

  return {
    build: {
      ssr: "./src/setup-cpp.ts",
      outDir: isLegacy ? "./dist/legacy" : "./dist/modern",
      target: isLegacy ? "node12" : "node20",
      minify: process.env.NODE_ENV === "production" ? "terser" : false,
      terserOptions: terserRc as TerserOptions,
      sourcemap: true,
      rollupOptions: {
        output: {
          format: isLegacy
            ? "cjs"
            : "es",
          manualChunks: {
            lib: ["./src/lib.ts"],
          },
          chunkFileNames: (chunkInfo) => {
            const moduleIds = chunkInfo.facadeModuleId
              ?.split("/").reverse()
              .slice(1, 3)
              .filter(part => !["src", "esm"].includes(part))
              .join("-")
            const hash = moduleIds !== undefined ? `-${moduleIds}` : ""

            return `${chunkInfo.name}${hash}.${isLegacy ? "js" : "mjs"}`
          },
        },
      },
      emptyOutDir: false,
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
            crypto: "./src/utils/compat/crypto/index.ts",
          }
          : {}),
      },
    },
    ssr: {
      target: "node",
      noExternal: true,
      external: module.builtinModules as string[],
    },
    plugins: isLegacy
      ? [
        babel({
          babelConfig,
        }),
      ]
      : [],
  }
})

export default viteConfig
