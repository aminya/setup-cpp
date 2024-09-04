import { buildTerserOptions } from "terser-config-atomic/dist/builder.js"
export default buildTerserOptions(process.env.NODE_ENV, undefined, true)
