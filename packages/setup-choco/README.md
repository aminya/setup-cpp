<h1 align="center">setup-choco</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-choco" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-choco.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Install Chocolatey packages on Windows.

## Install

```sh
npm install --save setup-choco
```

## Usage

```ts
import { setupChocoPack } from "setup-choco"

const result = await setupChocoPack("cmake", "3.30.0", ["--no-progress"], {
  rcOptions: { rcPath: "~/.cpprc", guard: "cpp" },
  setupChocolatey,
})
```

`setupChocoPack` installs a named Chocolatey package and adds Chocolatey's binary directory to PATH. If Chocolatey is missing, provide `setupChocolatey` in the dependency options to bootstrap it. The `rcOptions` callback configuration controls PATH persistence, and an exit code indicating a required reboot is reported as an informational message.

## API

### `InstallationInfo`

Contains the Chocolatey binary directory returned by the installer.

### `SetupChocoPackDependencies`

```ts
type SetupChocoPackDependencies = {
  rcOptions?: AddPathOptions
  setupChocolatey?: () => Promise<unknown>
}
```

### `setupChocoPack`

```ts
setupChocoPack(
  name: string,
  version?: string,
  args?: string[],
  dependencies?: SetupChocoPackDependencies,
): Promise<InstallationInfo>
```
