<h1 align="center">setup-extract</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-extract" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-extract.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Classify and extract tar, zip, 7z, and executable archives.

## Install

```sh
npm install --save setup-extract
```

## Usage

```ts
import { extractZip, getArchiveType, getExtractFunction } from "setup-extract"

const extract = getExtractFunction(getArchiveType("tool.zip"))
await extract("/tmp/tool.zip", "/tmp/tool")
await extractZip("/tmp/another.zip", "/tmp/another")
```

Extraction functions accept optional archive-tool dependencies. Supply `setupSevenZip` when 7z is unavailable, or `setupTar` when tar is unavailable; each callback is invoked only when its executable is needed.

## API

### `ArchiveToolDependencies`

```ts
type ArchiveToolDependencies = {
  setupSevenZip?: () => Promise<unknown>
  setupTar?: () => Promise<unknown>
}
```

### `ExtractFunction`

The common extractor shape: `(file, dest, dependencies?) => Promise<unknown>`.

### `ArchiveType`

The archive classifications `Tar`, `TarGz`, `TarXz`, `Zip`, and `SevenZip`.

### `getArchiveType`

Classifies an archive path by its extension, defaulting unknown extensions to 7z.

### `getExtractFunction`

Selects the platform-appropriate extractor for an `ArchiveType`.

### Extractors

`extract7Zip`, `extractExe`, `extractZip`, `extractTarByExe`, `extractTar`, and `extractXar` extract their respective archive formats. The tar and xar functions are re-exported from the underlying action tool-cache implementation.
