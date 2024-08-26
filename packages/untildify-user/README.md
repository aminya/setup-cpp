<h1 align="center">untildify-user</h1>
<p>
  <a href="https://www.npmjs.com/package/untildify-user" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/untildify-user.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: Apache--2.0" src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" />
  </a>
</p>

> Untildify a path for the current user even if it is root

## Install

```sh
npm install --save untildify-user
```

## Usage

<!-- INSERT GENERATED DOCS START -->

### `userHomeDir` (function)

**returns:** string

### `untildifyUser` (function)

Replaces a tilde with the user's home directory

**Parameters:**

- path (`string`) - The path to untildify

**returns:** string

```tsx
UntildifyUser("~/foo") // /home/user/foo
```

<!-- INSERT GENERATED DOCS END -->

## 🤝 Contributing

You can sponsor my work here:

https://github.com/sponsors/aminya

Pull requests, issues and feature requests are welcome.
See the [Contributing guide](https://github.com/aminya/setup-cpp/blob/master/CONTRIBUTING.md).
