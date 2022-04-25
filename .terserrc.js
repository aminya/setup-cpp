const terserConfig = require("terser-config-atomic")

const compress =
  typeof terserConfig.compress !== "boolean"
    ? {
        ...terserConfig.compress,
        global_defs: {
          ...terserConfig.compress.global_defs,
          "process.env.NODE_DEBUG": false,
          "process.env.RUNNER_DEBUG": "0",
        },
      }
    : terserConfig.compress

module.exports = {
  ...terserConfig,
  compress,
  format: {
    ...terserConfig.format,
    comments: false,
  },
}
