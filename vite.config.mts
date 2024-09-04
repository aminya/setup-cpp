import module from "module"
import MagicString from "magic-string"
import { type TerserOptions, defineConfig } from "vite"
import type { Plugin } from "vite"
import terserRc from "./.terserrc.mjs"

function shims(): Plugin {
  return {
    name: "node-shims",
    renderChunk(code, chunk) {
      if (!chunk.fileName.endsWith(".js")) {
        return
      }
      const s = new MagicString(code)
      s.prepend(`
import __path from 'path'
import { fileURLToPath as __fileURLToPath } from 'url'
import { createRequire as __createRequire } from 'module'

const __getFilename = () => __fileURLToPath(import.meta.url)
const __getDirname = () => __path.dirname(__getFilename())
const __dirname = __getDirname()
const __filename = __getFilename()
const self = globalThis
const require = __createRequire(import.meta.url)
`)
      return {
        code: s.toString(),
        map: s.generateMap(),
      }
    },
    apply: "build",
  }
}

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
  plugins: [shims()],
})

export default viteConfig
