import { buildTerserOptions } from "terser-config-atomic/dist/builder.js"
const config = buildTerserOptions(process.env.NODE_ENV, undefined, true)

if (
  typeof config.compress === "object"
  && "unsafe_math" in config.compress
) {
  config.compress.unsafe_math = false
}

export default config
