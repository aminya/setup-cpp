/* eslint-disable import/no-extraneous-dependencies */
import { readFile, writeFile } from "fs/promises"
import glob from "fast-glob"

const distFolder = "dist"

// remove node: prefix from the scripts in the dist folder

async function main() {
  const files = await glob([`${distFolder}/**/*.js`, `${distFolder}/**/*.js.map`], { absolute: true, onlyFiles: true })
  await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, "utf8")
      const newContent = content.replace(/require\("node:/g, 'require("')
      await writeFile(file, newContent)
    })
  )
}

await main()
