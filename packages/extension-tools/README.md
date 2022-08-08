<h1 align="center">extension-tools</h1>
<p>
  <a href="https://www.npmjs.com/package/extension-tools" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/extension-tools.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Tools for working with file extensions such as getting the binary and shell extension on different platforms.

## Install

```sh
npm install --save extension-tools
```

## Usage

<!-- INSERT GENERATED DOCS START -->

### `addBinExtension` (function)

Add bin extension to the given binary name.

**Parameters:**

- name (`string`) - The name you want to add the shell extension to
- win_ext (`string`) - `.exe` on Windows
- unix_ext (`string`) - `""` On unix.

**returns:** string

### `addShellExtension` (function)

Add native shell extension to the given name

**Parameters:**

- name (`string`) - The name you want to add the shell extension to
- win_ext (`string`) - `.bat` on Windows
- unix_ext (`string`) - `.sh` On unix.

**returns:** string

### `addShellHere` (function)

Prefix a `./` for unix shell and nothing for the cmd shell

**Parameters:**

- name (`string`)

**returns:** string

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/setup-cpp/blob/master/CONTRIBUTING.md).
