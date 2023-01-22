import { defineConfig } from "vite"
import { VitePluginNode } from "vite-plugin-node"
import terserOptions from "./.terserrc.js"

export default defineConfig({
  build: {
    target: "node12",
    ssr: true,
    minify: "terser",
    terserOptions,
  },
  ssr: { target: "node", format: "cjs" },
  plugins: [
    ...VitePluginNode({
      adapter(adapterArgs) {
        adapterArgs.app(adapterArgs.res, adapterArgs.res)
      },
      appPath: "./src/main.ts",
      exportName: "setup-cpp",
      tsCompiler: "esbuild",
    }),
  ],
})
