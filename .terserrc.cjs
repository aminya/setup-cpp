const { buildTerserOptions } = require("terser-config-atomic/dist/builder")
module.exports = buildTerserOptions(process.env.NODE_ENV, undefined, true)
