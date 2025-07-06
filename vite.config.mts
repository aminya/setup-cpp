import module from "module"
import { type AliasOptions, type TerserOptions, defineConfig } from "vite"
import babel from "vite-plugin-babel"
import terserRc from "./.terserrc.mjs"
import babelConfig from "./babel.config.cjs"

const viteConfig = defineConfig((configEnv) => {
  const isLegacy = configEnv.mode.includes("legacy")

  const plugins = []
  if (isLegacy) {
    plugins.push(
      babel({
        babelConfig,
      }),
    )
  }

  let aliasOpts: AliasOptions = {}
  if (isLegacy) {
    aliasOpts = {
      ...aliasOpts,
      "fs/promises": "./src/utils/compat/fs/promises.ts",
      "stream/promises": "./src/utils/compat/stream/promises.ts",
      "stream/web": "web-streams-polyfill/dist/ponyfill.mjs",
      "util/types": "util.types/index.js",
      "timers/promises": "timers-browserify",
      diagnostics_channel: "diagnostics_channel/index.js",
      crypto: "./src/utils/compat/crypto/index.ts",
    }
  }

  const isLibrary = configEnv.mode.includes("library")
  return {
    build: {
      ssr: isLibrary
        ? "./src/lib.ts"
        : "./src/setup-cpp.ts",
      outDir: isLibrary ? "./dist/library" : isLegacy ? "./dist/legacy" : "./dist/modern",
      target: isLegacy ? "node12" : "node20",
      minify: process.env.NODE_ENV === "production" ? "terser" : false,
      terserOptions: terserRc as TerserOptions,
      sourcemap: true,
      rollupOptions: {
        output: {
          format: isLegacy
            ? "cjs"
            : "es",
        },
      },
      emptyOutDir: true,
    },
    resolve: {
      alias: aliasOpts,
    },
    ssr: {
      target: "node",
      noExternal: true,
      external: [...module.builtinModules],
    },
    plugins,
  }
})

export default viteConfig
