# setup-cpp

Install all the tools required for building and testing C++/C projects.

![Build Status (Github Actions)](https://github.com/aminya/setup-cpp/workflows/CI/badge.svg)

Setting up a **cross-platform** environment for building and testing C++/C projects is a bit tricky. Each platform has its own compilers, and each of them requires a different installation procedure. This package aims to fix this issue.

`setup-cpp` can be used locally from terminal, from CI services like GitHub Actions and GitLab Pipelines, and inside containers like Docker.

`setup-cpp` is supported on many platforms. It is continuously tested on several configurations including Windows (11, 10, 2022, 2019) x64/ARM/x86, Linux (Ubuntu 24.0, 22.04, 20.04, 18.04, Fedora, ArchLinux) x64/ARM64, and macOS (15, 14, 13, 12, 11, 10.15) x64/ARM. `setup-cpp` is backed by unit tests for each tool and integration tests for compiling cpp projects.

See https://github.com/aminya/setup-cpp for more information about using `setup-cpp` in different environments.

### Prebuilt Docker Images

To provide fast development environments, `setup-cpp` provides several prebuilt docker images that have the tools you need. You can use these images as a base image for your project.

The names are in the format `aminya/setup-cpp-<platform>:<platform_version>-<setup_cpp_version>` and `aminya/setup-cpp-<platform>-<compiler>:<platform_version>-<setup_cpp_version>`.

#### Ubuntu Images

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang`

```dockerfile
FROM aminya/setup-cpp-ubuntu:22.04-1.1.0 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-llvm:22.04-1.1.0 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-gcc:22.04-1.1.0 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-mingw:22.04-1.1.0 AS builder
```

#### Fedora Images

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang`

```dockerfile
FROM aminya/setup-cpp-fedora:40-1.1.0 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-llvm:40-1.1.0 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-gcc:40-1.1.0 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-mingw:40-1.1.0 AS builder
```

#### ArchLinux Images

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang`

```dockerfile
FROM aminya/setup-cpp-arch:base-1.1.0 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-llvm:base-1.1.0 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-gcc:base-1.1.0 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-mingw:base-1.1.0 AS builder
```
