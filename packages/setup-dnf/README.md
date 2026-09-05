<h1 align="center">setup-dnf</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-dnf" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-dnf.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Install packages with dnf on Linux distributions that provide it.

## Install

```sh
npm install --save setup-dnf
```

## Usage

```ts
import { hasDnf, setupDnfPack } from "setup-dnf"

if (hasDnf()) {
  await setupDnfPack([{ name: "gcc", version: "14" }, { name: "make" }])
}
```

`hasDnf` detects whether dnf is available on the current Linux host. `setupDnfPack` installs each package, probes version formats when a version is supplied, and falls back to the unversioned package name when needed. It has no callback options.

## API

### `DnfPackage`

```ts
type DnfPackage = {
  name: string
  version?: string
}
```

### `InstallationInfo`

Contains the `/usr/bin/` directory used by installed packages.

### `hasDnf`

```ts
hasDnf(): boolean
```

### `setupDnfPack`

```ts
setupDnfPack(packages: DnfPackage[]): Promise<InstallationInfo>
```
