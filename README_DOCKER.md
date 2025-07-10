# setup-cpp

Install all the tools required for building and testing C++/C projects.

[![Build Status (Github Actions](https://github.com/aminya/setup-cpp/actions/workflows/CI.yml/badge.svg)](https://github.com/aminya/setup-cpp/actions/workflows/CI.yml)

Setting up a **cross-platform** environment for building and testing C++/C projects is a bit tricky. Each platform has its own compilers, and each of them requires a different installation procedure. This package aims to fix this issue.

`setup-cpp` can be used locally from terminal, from CI services like GitHub Actions and GitLab Pipelines, and inside containers like Docker.

`setup-cpp` is supported on many platforms. It is continuously tested on several configurations including Windows (11, 10, 2022, 2019) x64/ARM/x86, Linux (Ubuntu 24.0, 22.04, 20.04, 18.04, Fedora, ArchLinux) x64/ARM64, and macOS (15, 14, 13, 12, 11, 10.15) x64/ARM. `setup-cpp` is backed by unit tests for each tool and integration tests for compiling cpp projects.

See https://github.com/aminya/setup-cpp for more information about using `setup-cpp` in different environments.

### Prebuilt Docker Images

To provide fast development environments, `setup-cpp` provides several prebuilt docker images that have the tools you need. You can use these images as a base image for your project.

The tags are in the following template:

- Base image: `aminya/setup-cpp-ubuntu:24.04`
- Compiler image: `aminya/setup-cpp-ubuntu-llvm:24.04`
- Base image with pinned setup-cpp version: `aminya/setup-cpp-ubuntu:24.04-v1.7.1`
- Compiler image with pinned setup-cpp version: `aminya/setup-cpp-ubuntu-llvm:24.04-v1.7.1`

The supported platforms are `ubuntu`, `alpine`, `fedora`, and `arch`. The supported compilers are `llvm`, `gcc`, and `mingw`.

#### Ubuntu Images (amd64 and arm64)

Setup-cpp provides prebuilt images for various Ubuntu versions (20.04, 22.04, 24.04) with support for base tools, and compilers `llvm`, `gcc`, and `mingw` available for `amd64` and `arm64` architectures.

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang` for Ubuntu 24.04:

```dockerfile
FROM aminya/setup-cpp-ubuntu:24.04 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-llvm:24.04 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-gcc:24.04 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-mingw:24.04 AS builder
```

There are also the variants for Ubuntu `22.04`

```dockerfile
FROM aminya/setup-cpp-ubuntu:22.04 AS builder
FROM aminya/setup-cpp-ubuntu-llvm:22.04 AS builder
FROM aminya/setup-cpp-ubuntu-gcc:22.04 AS builder
FROM aminya/setup-cpp-ubuntu-mingw:22.04 AS builder
```

And for Ubuntu `20.04`:

```dockerfile
FROM aminya/setup-cpp-ubuntu:20.04 AS builder
FROM aminya/setup-cpp-ubuntu-llvm:20.04 AS builder
FROM aminya/setup-cpp-ubuntu-gcc:20.04 AS builder
FROM aminya/setup-cpp-ubuntu-mingw:20.04 AS builder
```

#### Alpine Images (amd64 and arm64)

Setup-cpp provides prebuilt images for Alpine with support for base tools, and compilers `llvm`, `gcc`, and `mingw` available for `amd64` and `arm64` architectures.

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang` for Alpine 3.18:

```dockerfile
FROM aminya/setup-cpp-alpine:3.21 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-alpine-llvm:3.21 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-alpine-gcc:3.21 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-alpine-mingw:3.21 AS builder
```

#### Fedora Images (amd64)

<details>

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang`

```dockerfile
FROM aminya/setup-cpp-fedora:40 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-llvm:40 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-gcc:40 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-mingw:40 AS builder
```

</details>

#### ArchLinux Images (amd64)

<details>

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang`

```dockerfile
FROM aminya/setup-cpp-arch:base AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-llvm:base AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-gcc:base AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-mingw:base AS builder
```

</details>
