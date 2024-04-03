/* eslint-disable import/no-extraneous-dependencies */
const { minify } = require("terser")
const { readFileSync, writeFileSync } = require("fs")
const { join, dirname } = require("path")

async function main() {
  console.log("Disabling debug messages inside @actions/core")
  const file = join(dirname(__dirname), "dist", "setup-cpp.js")
  const { code, map } = await minify(readFileSync(file, "utf8"), { sourceMap: true, ...require("../.terserrc.js") })

  writeFileSync(file, code)
  writeFileSync(`${file}.map`, map)
}

main().catch(function(err) {
  throw err
})
