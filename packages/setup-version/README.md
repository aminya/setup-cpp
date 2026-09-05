<!-- cspell:ignore Upto -->

<h1 align="center">setup-version</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-version" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-version.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Resolve, compare, normalize, and probe tool versions.

## Install

```sh
npm install --save setup-version
```

## Usage

```ts
import { addVPrefix, compareVersion, getVersions } from "setup-version"

const supported = getVersions(["3.5.2"])
const tag = addVPrefix("1.2.3")
const newestFirst = ["v1.2.0", "v1.3.0"].sort(compareVersion)
```

## API

`getVersions` expands specific versions into specific, minor, and major selectors. `getSpecificVersions` filters and sorts matching specific releases, while `getSpecificVersionAndUrl` finds the newest online release accepted by a URL callback.

`defaultVersionRegex` is the default binary-output matcher. `getBinVersion` probes a binary with `--version`, and `isBinUptoDate` compares the result with a target version or range.

`semverCoerceIfInvalid` and `semverCoercedRangeIfInvalid` normalize invalid semver input. `removeVPrefix` converts a leading-`v` version to its numeric prefix, `addVPrefix` ensures a leading `v`, and `compareVersion` sorts versions newest first with a string fallback.

### Function signatures

```ts
getSpecificVersions(versions: Set<string>, semversion: string): string[]
getVersions(specific: string[]): Set<string>
getSpecificVersionAndUrl(
  versions: Set<string>,
  platform: string,
  version: string,
  getUrl: (platform: string, version: string) => string | null | Promise<string | null>,
): Promise<[string, string]>
getBinVersion(file: string, versionRegex?: RegExp): Promise<SemVer | undefined>
isBinUptoDate(givenFile: string, targetVersion: string, versionRegex?: RegExp): Promise<boolean>
semverCoerceIfInvalid(version: string): string
semverCoercedRangeIfInvalid(version: string): string
removeVPrefix(version: string): number
addVPrefix(version: string): string
compareVersion(tag1: string, tag2: string): number
```
