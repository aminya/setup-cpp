<h1 align="center">setup-apt</h1>
<p>
  <a href="https://www.npmjs.com/package/setup-apt" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/setup-apt.svg">
  </a>
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

### `updateAptAlternatives` (function)

Update the alternatives for a package

**Parameters:**

- name (`string`) - The name of the package
- path (`string`) - The path to the binary
- priority (`number`) - The priority of the alternative (Defaults to `40`)

**returns:** Promise<void>

### `addUpdateAlternativesToRc` (function)

Add the update-alternatives command to the rc file

**Parameters:**

- name (`string`) - The name of the package
- path (`string`) - The path to the binary
- rcOptions (`RcOptions`) - The options for the rc file to add the update-alternatives command to
- priority (`number`) - The priority of the alternative (Defaults to `40`)

**returns:** Promise<void>

### `isAptPackInstalled` (function)

Check if a package is installed

**Parameters:**

- pack (`string`) - The package to check

**returns:** Promise<boolean>

### `isAptPackRegexInstalled` (function)

Check if a package matching a regexp is installed

**Parameters:**

- regexp (`string`) - The regexp to check

**returns:** Promise<boolean>

### `updateAptRepos` (function)

Update the apt repositories

**Parameters:**

- apt (`string`) - The apt command to use (optional)

**returns:** void

### `InstallationInfo` (type)

The information about an installation result

### `aptTimeout` (variable)

The timeout to use for apt commands
Wait up to 300 seconds if the apt-get lock is held

### `AptPackage` (type)

The information about an apt package

### `installAptPack` (function)

Install a package using apt

**Parameters:**

- packages (`AptPackage[]`) - The packages to install (name, and optional info like version and repositories)
- update (`boolean`) - Whether to update the package list before installing (Defaults to `false`)

**returns:** Promise<InstallationInfo>

```ts
await installAptPack([{ name: "ca-certificates" }, { name: "gnupg" }])
```

```ts
await installAptPack([
  {
    name: "gcc",
    version,
    repository: "ppa:ubuntu-toolchain-r/test",
    key: { key: "1E9377A2BA9EF27F", fileName: "ubuntu-toolchain-r-test.gpg" },
  },
])
```

### `hasNala` (function)

Check if nala is installed

**returns:** boolean

### `getApt` (function)

Get the apt command to use
If nala is installed, use that, otherwise use apt-get

**returns:** string

### `getAptEnv` (function)

Get the environment variables to use for the apt command

**Parameters:**

- apt (`string`) - The apt command to use

**returns:** ProcessEnv

### `AddAptKeyOptions` (type)

### `addAptKey` (function)

Add an apt key

**Parameters:**

- options (`AddAptKeyOptions`) - The options for adding the key

**returns:** Promise<string>

```ts
await addAptKey({
  key: "3B4FE6ACC0B21F32"
  fileName: "bazel-archive-keyring.gpg",
})
```

```ts
await addAptKey({
  keyUrl: "https://bazel.build/bazel-release.pub.gpg",
  fileName: "bazel-archive-keyring.gpg",
})
```

### `defaultKeyStorePath` (variable)

### `KeyServerOptions` (type)

### `defaultKeyServer` (variable)

### `addAptKeyViaServer` (function)

Add an apt key via a keyserver

**Parameters:**

- { key, keyServer = defaultKeyServer, fileName, keyStorePath = defaultKeyServer } (`KeyServerOptions`)

**returns:** Promise<string>

### `KeyUrl` (type)

### `addAptKeyViaURL` (function)

Add an apt key via a download

**Parameters:**

- options - The options for adding the key
- { keyUrl, fileName, keyStorePath = defaultKeyStorePath } (`KeyUrl`)

**returns:** Promise<string>

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/setup-cpp/blob/master/CONTRIBUTING.md).
