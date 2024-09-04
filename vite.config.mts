import module from "module"
import { type TerserOptions, defineConfig } from "vite"
import terserRc from "./.terserrc.mjs"

const viteConfig = defineConfig({
  build: {
    ssr: "./src/setup-cpp.ts",
    outDir: "./dist/modern",
    target: "node20",
    minify: "terser",
    terserOptions: terserRc as TerserOptions,
    sourcemap: true,
  },
  ssr: {
    target: "node",
    noExternal: true,
    external: module.builtinModules,
  },
})

export default viteConfig
