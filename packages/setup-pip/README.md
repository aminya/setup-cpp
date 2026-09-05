<h1 align="center">setup-pip</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-pip" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-pip.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Install Python packages with pip, pipx, or a supported system package manager.

## Install

```sh
npm install --save setup-pip
```

## Usage

```ts
import { setupPipPack } from "setup-pip"

await setupPipPack("black", undefined, { usePipx: true, upgrade: true }, {
  getPython: async (version) => resolvePython(version),
  rcOptions: { rcPath: "~/.cpprc", guard: "cpp" },
})
```

`setupPipPack` detects pipx and pip, handles extras such as `package[feature]`, adds installed script directories to PATH, and falls back to the host system package manager when Python reports an externally managed environment. The optional dependency object keeps Python resolution and PATH persistence injectable for the host application. Without `getPython`, an already available `python` or `python3` binary is used.

## API

### `SetupPipPackOptions`

```ts
type SetupPipPackOptions = {
  usePipx?: boolean
  user?: boolean
  upgrade?: boolean
  isLibrary?: boolean
  pythonVersion?: string
}
```

### `SetupPipPackDependencies`

```ts
type SetupPipPackDependencies = {
  getPython?: (version?: string) => Promise<string>
  rcOptions?: AddPathOptions
}
```

`getPython` resolves the Python executable for the requested version. `rcOptions` controls PATH persistence for installed command-line tools.

### Public functions

`setupPipPack` installs through a resolved Python executable. `setupPipPackWithPython` accepts that executable explicitly. `setupPipPackSystem` selects the available platform package manager.

`hasPipxBinary` and `hasPipxModule` detect pipx. `addPythonBaseExecPrefix` adds Python's executable-prefix candidates to PATH, `getPythonBaseExecPrefix` reads the base prefix, and `isExternallyManaged` detects the externally managed marker.
