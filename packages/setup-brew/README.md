<h1 align="center">setup-brew</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Setup brew and brew packages

## Install

```sh
npm install --save setup-brew
```

## Usage

<!-- INSERT GENERATED DOCS START -->

### `InstallationInfo` (type)

The information about an installation result

### `SetupBrewOptions` (type)

### `setupBrew` (function)

**Parameters:**

- options (`SetupBrewOptions`)

**returns:** Promise<InstallationInfo>

### `getBrewBinDir` (function)

Get the path where brew is installed

**returns:** "/opt/homebrew/bin/" | "/usr/local/bin/" | "/home/linuxbrew/.linuxbrew/bin/"

### `BrewPackOptions` (type)

### `installBrewPack` (function)

A function that installs a package using brew

**Parameters:**

- name (`string`)
- version (`string`)
- givenOptions (`BrewPackOptions`)

**returns:** Promise<InstallationInfo>

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/setup-cpp/blob/master/CONTRIBUTING.md).