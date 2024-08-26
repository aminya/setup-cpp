<h1 align="center">envosman</h1>
<p>
  <a href="https://www.npmjs.com/package/envosman" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/envosman.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Manage environment variables, PATH, and rc files

## Install

```sh
npm install --save envosman
```

## Usage

<!-- INSERT GENERATED DOCS START -->

### `defaultRcPath` (variable)

### `RcOptions` (type)

Options for adding an rc file

### `sourceRCInRc` (variable)

handles adding conditions to source rc file from .bashrc and .profile

### `finalizeRC` (function)

**Parameters:**

- rcOptions (`RcOptions`)

**returns:** Promise<void>

### `escapeString` (function)

Escape a string for use in a shell command

**Parameters:**

- valGiven (`string`) - The string to escape
- shouldEscapeSpace (`boolean`) - Whether to escape spaces in the string

**returns:** any

### `AddEnvOptions` (type)

The options for adding an environment variable

### `addEnv` (function)

Add an environment variable.

This function is cross-platforms and works in all the local or CI systems.

**Parameters:**

- name (`string`)
- valGiven (`string`)
- givenOptions (`Partial<AddEnvOptions>`)

**returns:** Promise<void>

### `AddPathOptions` (type)

The options for adding a PATH variable

### `addPath` (function)

Add a path to the PATH environment variable.

This function is cross-platforms and works in all the local or CI systems.

**Parameters:**

- path (`string`)
- givenOptions (`Partial<AddPathOptions>`)

**returns:** Promise<void>

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/setup-cpp/blob/master/CONTRIBUTING.md).
