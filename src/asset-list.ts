import { basename, dirname } from "path"
import { execa } from "execa"
import glob from "fast-glob"

async function main() {
  // create a github token from gh
  const token = await execa("gh", ["auth", "token"])
  process.env.GITHUB_TOKEN = token.stdout

  const files = await glob("src/*/assets-list.ts", {
    onlyFiles: true,
    absolute: true,
    ignore: ["node_modules"],
  })

  await Promise.all(files.map(async (file) => {
    console.log(`Updating ${basename(dirname(file))}`)

    const jsFile = file.replace(".ts", ".js")
    await import(jsFile)
  }))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
