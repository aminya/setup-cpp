# setup-cpp

Install all the tools required for building and testing C++/C projects.

[![Build Status (Github Actions](https://github.com/aminya/setup-cpp/actions/workflows/CI.yml/badge.svg)](https://github.com/aminya/setup-cpp/actions/workflows/CI.yml)

Setting up a **cross-platform** environment for building and testing C++/C projects is a bit tricky. Each platform has its own compilers, and each of them requires a different installation procedure. This package aims to fix this issue.

`setup-cpp` can be used locally from terminal, from CI services like GitHub Actions and GitLab Pipelines, and inside containers like Docker.

`setup-cpp` is supported on many platforms. It is continuously tested on several configurations including Windows (11, 10, 2022, 2019) x64/ARM/x86, Linux (Ubuntu 24.0, 22.04, 20.04, 18.04, Fedora, ArchLinux) x64/ARM64, and macOS (15, 14, 13, 12, 11, 10.15) x64/ARM. `setup-cpp` is backed by unit tests for each tool and integration tests for compiling cpp projects.

<!-- dprint-ignore -->
```yaml
      # GitHub Actions example:
      - name: Setup Cpp
        uses: aminya/setup-cpp@v1
        with:
          compiler: llvm
          vcvarsall: true
          cmake: true
          ninja: true
          vcpkg: true
```

## Features

`setup-cpp` is **modular** and you can choose to install any of these tools:

| category        | tools                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| compiler        | llvm, gcc, msvc, apple-clang, vcvarsall                                                                     |
| build system    | cmake, ninja, meson, make, task, bazel                                                                      |
| package manager | vcpkg, conan, choco, brew, nala, git, setup-cpp                                                             |
| analyzer/linter | clang-tidy, clang-format, cppcheck, cpplint, flawfinder, lizard, infer, cmakelang, cmake-format, cmake-lint |
| cache           | ccache, sccache                                                                                             |
| documentation   | doxygen, graphviz                                                                                           |
| coverage        | gcovr, opencppcoverage, kcov                                                                                |
| other           | python, powershell, sevenzip                                                                                |

`setup-cpp` automatically handles the dependencies of the selected tool (e.g., `python` is required for `conan`).

## Usage

### From Terminal

#### With npm and Nodejs

Run `setup-cpp` with the available options.

```shell
# Windows example (open PowerShell as admin)
npx setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
# restart the shell to activate the environment
```

```shell
# Linux/Macos example
sudo npx setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
source ~/.cpprc # activate cpp environment variables
```

NOTE: In the `compiler` entry, you can specify the version after `-` like `llvm-18`. For the tools, you can pass a specific version instead of `true` that chooses the default version

NOTE: On Unix systems, when `setup-cpp` is used locally or in other CI services like GitLab, the environment variables are added to `~/.cpprc`. You should run `source ~/.cpprc` to immediately activate the environment variables. This file is automatically sourced in the next shell restart from `~/.bashrc` or `~/.profile` if `SOURCE_CPPRC` is not set to `0`. To deactivate `.cpprc` in the next shell restart, rename/remove `~/.cpprc`.

NOTE: On Unix systems, if you are already a root user (e.g., in a GitLab runner or Docker), you will not need to use `sudo`.

NOTE: setup-cpp requires Nodejs 12 or higher. If Nodejs shipped with your distribution is older than 12, install the latest Node (e.g. for [Ubuntu 20.04](https://github.com/aminya/setup-cpp/blob/e2b11c45c1108526f905729542711e343a54a7fb/dev/docker/setup-cpp-ubuntu-20.0.4.dockerfile#L4-L13)), or alternatively you can use the executables that are self-contained (see the next section).

#### With executable

Download the executable for your platform from [here](https://github.com/aminya/setup-cpp/releases/tag/v1.1.1), and run it with the available options. You can also automate downloading using `curl`, or other similar tools.

```shell
# windows x64
curl -o ./setup-cpp.exe -LJ "https://github.com/aminya/setup-cpp/releases/download/v1.1.1/setup-cpp-x64-windows.exe"

# linux x64
curl -o ./setup-cpp -LJ "https://github.com/aminya/setup-cpp/releases/download/v1.1.1/setup-cpp-x64-linux"
chmod +x ./setup-cpp

# macos arm64
curl -o ./setup-cpp -LJ "https://github.com/aminya/setup-cpp/releases/download/v1.1.1/setup-cpp-arm64-macos"
chmod +x ./setup-cpp

# macos x64
curl -o ./setup-cpp -LJ "https://github.com/aminya/setup-cpp/releases/download/v1.1.1/setup-cpp-x64-macos"
chmod +x ./setup-cpp
```

An example that installs llvm, cmake, ninja, ccache, and vcpkg:

```shell
# windows example (open PowerShell as admin)
./setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
# restart the shell to activate the environment
```

```shell
# linux/macos example
sudo ./setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
source ~/.cpprc # activate cpp environment variables
```

NOTE: On Unix systems, if you are already a root user (e.g., in a GitLab runner or Docker), you will not need to use `sudo`.

### Inside GitHub Actions

A simple example for building with LLVM, cmake, ninja, vcpkg:

<!-- dprint-ignore -->
```yaml
      - name: Setup Cpp
        uses: aminya/setup-cpp@v1
        with:
          compiler: llvm
          vcvarsall: true
          cmake: true
          ninja: true
          vcpkg: true
```

A simple example for installing clang-format for code formatting:

<!-- dprint-ignore -->
```yaml
      - name: Setup Cpp
        uses: aminya/setup-cpp@v1
        with:
          clang-format: true
```

A complete cross-platform example that tests llvm, gcc, and msvc. It also uses cmake, ninja, vcpkg, and cppcheck.

`.github/workflows/ci.yml`:

```yaml
name: ci
on:
  pull_request:
  push:
    branches:
      - main
      - master

jobs:
  Test:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os:
          - windows-2022
          - ubuntu-24.04
          - macos-14 # arm64
          - macos-13
        compiler:
          - llvm
          - gcc
          # you can specify the version after `-` like `llvm-18`.
        include:
          - os: "windows-2022"
            compiler: "msvc"
    steps:
      - uses: actions/checkout@v3
      - name: Cache
        uses: actions/cache@v3
        with:
          path: |
            ./build/
            ~/vcpkg
            ~/.cache/vcpkg/archives
            ${{ env.LOCALAPPDATA }}/vcpkg/archives
            ${{ env.APPDATA }}/vcpkg/archives
            ${{ env.XDG_CACHE_HOME }}/vcpkg/archives
            ~/.cache/ccache
            ~/.ccache
            ~/.config/ccache
            ~/Library/Caches/ccache
            ${{ env.LOCALAPPDATA }}/ccache
            ${{ env.XDG_CACHE_HOME }}/ccache
          key: ${{ runner.os }}-${{ matrix.compiler }}-${{ env.BUILD_TYPE }}-${{ hashFiles('**/CMakeLists.txt', './vcpkg.json') }}
          restore-keys: |
            ${{ runner.os }}-${{ env.BUILD_TYPE }}-

      - name: Setup Cpp
        uses: aminya/setup-cpp@v1
        with:
          compiler: ${{ matrix.compiler }}
          vcvarsall: true
          cmake: true
          ninja: true
          vcpkg: true
          cppcheck: true # instead of `true`, which chooses the default version, you can pass a specific version.
```

When using the `setup-cpp` action in GitHub Actions, by default it will also install the `setup-cpp` CLI, which you can use in the subsequent commands. You can modify the default behaviour if needed.

```yaml
  - name: Setup Cpp
    uses: aminya/setup-cpp@v1
    with:
      setup-cpp: true
      node-package-manager: "npm"

  - name: Use Setup Cpp CLI
    run: setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
```

### Prebuilt Docker Images

To provide fast development environments, `setup-cpp` provides several prebuilt docker images that have the tools you need. You can use these images as a base image for your project.

The names are in the format `aminya/setup-cpp-<platform>:<platform_version>-<setup_cpp_version>` and `aminya/setup-cpp-<platform>-<compiler>:<platform_version>-<setup_cpp_version>`.

#### Ubuntu Images

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang`

```dockerfile
FROM aminya/setup-cpp-ubuntu:22.04-1.1.1 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-llvm:22.04-1.1.1 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-gcc:22.04-1.1.1 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-ubuntu-mingw:22.04-1.1.1 AS builder
```

#### Fedora Images

<details>

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang`

```dockerfile
FROM aminya/setup-cpp-fedora:40-1.1.1 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-llvm:40-1.1.1 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-gcc:40-1.1.1 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-fedora-mingw:40-1.1.1 AS builder
```

</details>

#### ArchLinux Images

<details>

Base image with `cmake, ninja, task, vcpkg, python, make, cppcheck, gcovr, doxygen, ccache, conan, meson, cmakelang`

```dockerfile
FROM aminya/setup-cpp-arch:base-1.1.1 AS builder
```

Image with `llvm` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-llvm:base-1.1.1 AS builder
```

Image with `gcc` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-gcc:base-1.1.1 AS builder
```

Image with `mingw` and the base tools:

```dockerfile
FROM aminya/setup-cpp-arch-mingw:base-1.1.1 AS builder
```

</details>

### Custom Docker Images

If you need to install the tools selectively, you can create your own Docker image with the tools you need.

Here is an example for using setup-cpp to make a builder image that has the Cpp tools you need.

```dockerfile
#### Base Image
FROM ubuntu:22.04 as setup-cpp-ubuntu

RUN apt-get update -qq && \
    # install nodejs
    apt-get install -y --no-install-recommends nodejs npm && \
    # install setup-cpp
    npm install -g setup-cpp@v1.1.1 && \
    # install the compiler and tools
    NODE_OPTIONS="--enable-source-maps" \
    setup-cpp \
        --nala true \
        --compiler llvm \
        --cmake true \
        --ninja true \
        --task true \
        --vcpkg true \
        --python true \
        --make true \
        --cppcheck true \
        --gcovr true \
        --doxygen true \
        --ccache true && \
    # cleanup
    nala autoremove -y && \
    nala autopurge -y && \
    apt-get clean && \
    nala clean --lists && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]

#### Building (example)
FROM setup-cpp-ubuntu AS builder

COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN task build

#### Running environment
# use a fresh image as the runner
FROM ubuntu:22.04 as runner

# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
```

See [this folder](https://github.com/aminya/setup-cpp/tree/master/dev/docker), for some dockerfile examples.

If you want to build the ones included, then run:

```shell
git clone --recurse-submodules https://github.com/aminya/setup-cpp
cd ./setup-cpp
docker build -f ./dev/docker/setup-cpp/setup-cpp-ubuntu.dockerfile -t setup-cpp-ubuntu-llvm:22.04-17 ./
```

Where you should use the path to the dockerfile after `-f`.

After build, run the following to start an interactive shell in your container

```shell
docker run -it setup-cpp-ubuntu-llvm:22.04-17
```

### Inside Docker inside GitHub Actions

You can use the docker file discussed in the previous section inside GitHub Actions like the following:

```yaml
jobs:
  Docker:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os:
          - ubuntu-24.04
    steps:
      - uses: actions/checkout@v3
      - name: Build
        id: docker_build
        run: |
          docker build -f ./dev/docker/ubuntu.dockerfile -t setup-cpp .
```

### Inside GitLab pipelines

The following gives an example for setting up a C++ environment inside GitLab pipelines.

.gitlab-ci.yaml

```yaml
image: ubuntu:22.04

stages:
  - test

.setup_linux: &setup_linux |
  DEBIAN_FRONTEND=noninteractive

  # set time-zone
  TZ=Canada/Pacific
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

  # for downloading
  apt-get update -qq
  apt-get install -y --no-install-recommends curl gnupg ca-certificates

.setup-cpp: &setup-cpp |
  # install nodejs
  apt-get install -y --no-install-recommends nodejs npm

  # install setup-cpp
  npm install -g setup-cpp@v1.1.1

  # install the compiler and tools
  ./setup-cpp-x64-linux --compiler $compiler --cmake true --ninja true --ccache true --vcpkg true
  source ~/.cpprc

.test: &test |
  # Build and Test
  # ...

test_linux_llvm:
  stage: test
  variables:
    compiler: llvm
  script:
    - *setup_linux
    - *setup-cpp
    - *test

test_linux_gcc:
  stage: test
  variables:
    compiler: gcc
  script:
    - *setup_linux
    - *setup-cpp
    - *test
```

## Articles

[Setup-Cpp on Dev.to](https://dev.to/aminya/setup-cpp-3ia4)

## Usage Examples

- [cpp_vcpkg_project project](https://github.com/aminya/cpp_vcpkg_project)
- [project_options](https://github.com/aminya/project_options)
- [cpp-best-practices starter project](https://github.com/cpp-best-practices/cpp_starter_project)
- [ftxui](https://github.com/ArthurSonzogni/FTXUI)
- [inja](https://github.com/pantor/inja)
- [teslamotors/fixed-containers](https://github.com/teslamotors/fixed-containers)
- [zeromq.js](https://github.com/zeromq/zeromq.js)
- [json2cpp](https://github.com/lefticus/json2cpp)
- [lefticus/tools](https://github.com/lefticus/tools)
- [watcher](https://github.com/e-dant/watcher)
- [pinpoint-c-agent](https://github.com/pinpoint-apm/pinpoint-c-agent)
- [dpp](https://github.com/atilaneves/dpp)
- [DSpellCheck](https://github.com/Predelnik/DSpellCheck)
- [simdjson-rust](https://github.com/SunDoge/simdjson-rust)
- [CXXIter](https://github.com/seijikun/CXXIter)
- [git-tui](https://github.com/ArthurSonzogni/git-tui)
- [supercell](https://github.com/orex/supercell)
- [libclang](https://github.com/atilaneves/libclang)
- [d-tree-sitter](https://github.com/aminya/d-tree-sitter)
- [atom-community/papm](https://github.com/atom-community/papm)
- [ecs_benchmark](https://github.com/abeimler/ecs_benchmark)
- [smk](https://github.com/ArthurSonzogni/smk)

See all of the usage examples on GitHub [here](https://github.com/search?q=aminya%2Fsetup-cpp+path%3A.github%2Fworkflows%2F+language%3AYAML+fork%3Atrue&type=code).
