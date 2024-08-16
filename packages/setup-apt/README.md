<h1 align="center">setup-apt</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Setup apt packages and repositories in Debian/Ubuntu-based distributions

## Install

```sh
npm install --save setup-apt
```

## Usage

<!-- INSERT GENERATED DOCS START -->

### `InstallationInfo` (type)

### `aptTimeout` (variable)

### `AptPackage` (type)

### `installAptPack` (function)

A function that installs a package using apt

**Parameters:**

- packages (`AptPackage[]`)
- update (`boolean`)

**returns:** Promise<InstallationInfo>

### `hasNala` (function)

**returns:** boolean

### `getApt` (function)

**returns:** string

### `addAptKeyViaServer` (function)

**Parameters:**

- keys (`string[]`)
- name (`string`)
- server (`string`)

**returns:** Promise<string>

### `addAptKeyViaDownload` (function)

**Parameters:**

- name (`string`)
- url (`string`)

**returns:** Promise<string>

### `updateAptAlternatives` (function)

**Parameters:**

- name (`string`)
- path (`string`)
- rcOptions (`RcOptions`)
- priority (`number`)

**returns:** Promise<void>

### `isAptPackInstalled` (function)

**Parameters:**

- pack (`string`)

**returns:** Promise<boolean>

### `isAptPackRegexInstalled` (function)

**Parameters:**

- regexp (`string`)

**returns:** Promise<boolean>

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/setup-cpp/blob/master/CONTRIBUTING.md).
