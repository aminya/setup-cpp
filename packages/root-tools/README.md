<h1 align="center">root-tools</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Tools for working with root and sudo such as executing command as root, detecting root, etc.

## Install

```sh
npm install --save root-tools
```

## Usage

<!-- INSERT GENERATED DOCS START -->

### `isSudo` (function)

Detect if sudo is available and the user has root privileges

**returns:** boolean

### `isRoot` (function)

Detect if the process has root privileges

**returns:** boolean

### `prependSudo` (function)

Prepend `sudo` to the command if sudo is available

**Parameters:**

- command (`string`)

**returns:** string

### `execRootSync` (function)

Execute a command as root if sudo is available. Otherwise executes the command normally without sudo.

**Parameters:**

- program (`string`) - The program to spawn
- args (`string[]`) - The command arguments
- execOptions (`execa.SyncOptions`) - The options passed to `execa`. Defaults to `{ stdio: "inherit", shell: true }`

**returns:** execa.ExecaSyncReturnValue<string>

### `execRoot` (function)

Asynchronously execute a command as root if sudo is available. Otherwise executes the command normally without sudo.

**Parameters:**

- program (`string`) - The program to spawn
- args (`string[]`) - The command arguments
- execOptions (`execa.Options`) - The options passed to `execa`. Defaults to `{ stdio: "inherit", shell: true }`

**returns:** execa.ExecaChildProcess<string>

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/setup-cpp/blob/master/CONTRIBUTING.md).
