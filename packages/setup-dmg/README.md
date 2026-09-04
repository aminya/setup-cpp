<h1 align="center">setup-dmg</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-dmg" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-dmg.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Extract a macOS DMG archive into a destination directory.

## Install

```sh
npm install --save setup-dmg
```

## Usage

```ts
import { setupDmg } from "setup-dmg"

await setupDmg("/tmp/tool.dmg", "/tmp/tool")
```

`setupDmg` reads the DMG lazily and extracts every archive entry below `destDir`, preserving each entry's relative path. It has no callback options.

## API

### `setupDmg`

```ts
setupDmg(path: string, destDir: string): Promise<void>
```
