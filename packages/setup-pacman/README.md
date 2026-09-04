<h1 align="center">setup-pacman</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-pacman" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-pacman.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Install packages with pacman or an Arch User Repository helper.

## Install

```sh
npm install --save setup-pacman
```

## Usage

```ts
import { isArch, setupPacmanPack } from "setup-pacman"

if (isArch()) {
  await setupPacmanPack("gcc")
  await setupPacmanPack("some-aur-package", undefined, "yay")
}
```

`isArch` detects an Arch-like host by checking for pacman. `setupPacmanPack` installs the latest package or probes available versions before trying versioned forms. Pass `aur: "yay"` to install through yay; the helper handles the non-root builder-user requirement when necessary. It has no callback options.

## API

### `InstallationInfo`

Contains the `/usr/bin/` directory used by installed packages.

### `isArch`

```ts
isArch(): boolean
```

### `setupPacmanPack`

```ts
setupPacmanPack(name: string, version?: string, aur?: string): Promise<InstallationInfo>
```
