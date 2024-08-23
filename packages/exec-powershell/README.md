<h1 align="center">exec-powershell</h1>
<p>
  <a href="https://www.npmjs.com/package/exec-powershell" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/exec-powershell.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Run a powershell command.

## Install

```sh
npm install --save exec-powershell
```

## Usage

<!-- INSERT GENERATED DOCS START -->

### `execPowershell` (function)

Asynchronously execute a powershell command.

**Parameters:**

- command (`string`) - The powershell command to execute
- startupFlags (`string[]`) - The optional startup flags to be passed to powershell. Defaults to `["-NoProfile", "-NoLogo", "-NonInteractive"]`. This means that the Powershell profile is not sourced first.
- execOptions (`Options<string>`) - The options passed to `execa`. Defaults to `{ stdio: "inherit" }`

**returns:** ExecaChildProcess<string>

### `execPowershellSync` (function)

Execute a powershell command.

**Parameters:**

- command (`string`) - The powershell command to execute
- startupFlags (`string[]`) - The optional startup flags to be passed to powershell. Defaults to `["-NoProfile", "-NoLogo", "-NonInteractive"]`. This means that the Powershell profile is not sourced first.
- execOptions (`SyncOptions<string>`) - The options passed to `execa`. Defaults to `{ stdio: "inherit" }`

**returns:** ExecaReturnBase<string>

### `getPowerShell` (function)

Get the path to the powershell executable.

**returns:** string

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/setup-cpp/blob/master/CONTRIBUTING.md).
