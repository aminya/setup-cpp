<h1 align="center">setup-bin</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-bin" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-bin.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Download, extract, cache, and configure binary tools.

## Install

```sh
npm install --save setup-bin
```

## Usage

```ts
import { setupBin } from "setup-bin"

const result = await setupBin("tool", "1.2.3", getPackageInfo, setupDir, process.arch, {
  cacheTools: true,
  setupSevenZip,
  setupTar,
})
```

`setupBin` downloads the package described by `getPackageInfo`, extracts it when necessary, adds its binary directory to PATH, and optionally caches it in GitHub Actions. The package-info callback returns `url`, `extractedFolderName`, `binRelativeDir`, `binFileName`, and an optional `extractFunction`.

`SetupBinOptions` accepts `rcOptions` for PATH persistence, `cacheTools` to enable tool caching, and optional `setupSevenZip` and `setupTar` callbacks for archive-tool fallback.

## API

### `PackageInfo`

Describes the download URL, extracted layout, binary name, and optional archive extractor.

### `InstallationInfo`

Contains the installation directory and binary directory returned by `setupBin`.

### `SetupBinOptions`

```ts
type SetupBinOptions = {
  rcOptions?: AddPathOptions
  cacheTools?: boolean
  setupSevenZip?: () => Promise<unknown>
  setupTar?: () => Promise<unknown>
}
```

### `setupBin`

```ts
setupBin(
  name: string,
  version: string,
  getPackageInfo: (version: string, platform: NodeJS.Platform, arch: string) => PackageInfo | Promise<PackageInfo>,
  setupDir: string,
  arch: string,
  options?: SetupBinOptions,
): Promise<InstallationInfo>
```
