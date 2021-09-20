import { addPath } from "../utils/path/addPath"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupDoxygen(version: string | undefined, _setupCppDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      await setupChocoPack("doxygen.install", version)
      // TODO fails on windows?
      // await setupChocoPack("graphviz", version)
      /**
       * Graphviz v2.49.0 [Approved] graphviz package files install completed. Performing other installation steps.
       * graphviz not installed. An error occurred during installation: Item has already been added. Key in dictionary:
       * 'Path' Key being added: 'PATH'
       *
       *     Chocolatey installed 0/0 packages.
       *      See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
       *     The process cannot access the file 'C:\ProgramData\chocolatey\lib\Graphviz\.chocolateyPending' because it is being used by another process.
       *
       *       18 |     execa.sync("choco", ["install", "-y", name, `--version=${version}`, ...args])
       *       19 |   } else {
       *     > 20 |     execa.sync("choco", ["install", "-y", name, ...args])
       *          |           ^
       *       21 |   }
       *       22 |
       *       23 |   const binDir = "C:/ProgramData/Chocolatey/bin/"
       *
       *       at makeError (node_modules/.pnpm/execa@5.1.1/node_modules/execa/lib/error.js:60:11)
       *       at Function.Object.<anonymous>.module.exports.sync (node_modules/.pnpm/execa@5.1.1/node_modules/execa/index.js:194:17)
       *       at setupChocoPack (src/utils/setup/setupChocoPack.ts:20:11)
       *       at setupDoxygen (src/doxygen/doxygen.ts:11:27)
       *       at Object.<anonymous> (src/doxygen/__tests__/doxygen.test.ts:8:25)
       */
      const binDir = activateWinDoxygen()
      return { binDir }
    }
    case "darwin": {
      setupBrewPack("doxygen", version)
      return setupBrewPack("graphviz", version)
    }
    case "linux": {
      await setupAptPack("doxygen", version)
      return setupAptPack("graphviz", version)
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

function activateWinDoxygen() {
  addPath("C:/Program Files/Graphviz/bin")
  const binDir = "C:/Program Files/doxygen/bin"
  addPath(binDir)
  return binDir
}
