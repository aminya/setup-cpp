# setup-cpp

Install all the tools required for building and testing C++/C projects.

![Build Status (Github Actions)](https://github.com/aminya/setup-cpp/workflows/CI/badge.svg)

Setting up a **cross-platform** environment for building and testing C++/C projects is a bit tricky. Each platform has its own compilers, and each of them requires a different installation procedure. This package aims to fix this issue.

`setup-cpp` can be used locally from terminal, from CI services like GitHub Actions and GitLab Pipelines, and inside containers like Docker.

`setup-cpp` is supported on many platforms. It is continuously tested on several configurations including Windows (11, 10, 2022, 2019), Linux (Ubuntu 22.04, Ubuntu 20.04, Fedora, ArchLinux), and macOS (12, 11, 10.15). `setup-cpp` is backed by unit tests for each tool and integration tests for compiling cpp projects.

## Features

`setup-cpp` is **modular** and you can choose to install any of these tools:

| category              | tools                                                        |
| --------------------- | ------------------------------------------------------------ |
| compiler and analyzer | llvm, gcc, msvc, vcvarsall, cppcheck, clangtidy, clangformat |
| build system          | cmake, ninja, meson, make, task, bazel                       |
| package manager       | vcpkg, conan, choco, brew, nala                              |
| cache                 | cppcache, sccache                                            |
| documentation         | doxygen, graphviz                                            |
| coverage              | gcovr, opencppcoverage, kcov                                 |
| other                 | python, powershell, sevenzip                                 |

`setup-cpp` automatically handles the dependencies of the selected tool (e.g., `python` is required for `conan`).

## Usage

### From Terminal

#### With npm and Nodejs

Run `setup-cpp` with the available options.

```shell
# Windows example (open PowerShell as admin)
npx setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

RefreshEnv.cmd # activate the environment
```

```shell
# Linux/Macos example
sudo npx setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

source ~/.cpprc
```

NOTE: In the `compiler` entry, you can specify the version after `-` like `llvm-11.0.0`. For the tools, you can pass a specific version instead of `true` that chooses the default version

NOTE: On Unix systems, when `setup-cpp` is used locally or in other CI services like GitLab, the environment variables are added to `~/.cpprc`. You should run `source ~/.cpprc` to immediately activate the environment variables. This file is automatically sourced in the next shell restart from `~/.bashrc` or `~/.profile` if `SOURCE_CPPRC` is not set to `0`. To deactivate `.cpprc` in the next shell restart, rename/remove `~/.cpprc`.

NOTE: On Unix systems, if you are already a root user (e.g., in a GitLab runner or Docker), you will not need to use `sudo`.

#### With executable

Download the executable for your platform from [here](https://github.com/aminya/setup-cpp/releases/tag/v0.32.1), and run it with the available options. You can also automate downloading using `wget`, `curl`, or other similar tools.

An example that installs llvm, cmake, ninja, ccache, and vcpkg:

```shell
# windows example (open PowerShell as admin)
curl -LJO "https://github.com/aminya/setup-cpp/releases/download/v0.32.1/setup-cpp-x64-windows.exe"
./setup-cpp-x64-windows --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

RefreshEnv.cmd # activate cpp environment variables
```

```shell
# linux example
wget "https://github.com/aminya/setup-cpp/releases/download/v0.32.1/setup-cpp-x64-linux"
chmod +x ./setup-cpp-x64-linux
sudo ./setup-cpp-x64-linux --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

source ~/.cpprc # activate cpp environment variables
```

```shell
# macos example
wget "https://github.com/aminya/setup-cpp/releases/download/v0.32.1/setup-cpp-x64-macos"
chmod +x ./setup-cpp-x64-macos
sudo ./setup-cpp-x64-macos --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

source ~/.cpprc # activate cpp environment variables
```

### Inside GitHub Actions

Here is a complete cross-platform example that tests llvm, gcc, and msvc. It also uses cmake, ninja, vcpkg, and cppcheck.

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
          - ubuntu-22.04
          - macos-12
        compiler:
          - llvm
          - gcc
          # you can specify the version after `-` like `llvm-13.0.0`.
        include:
          - os: "windows-2022"
            compiler: "msvc"
    steps:
      - uses: actions/checkout@v3
      - name: Cache
        uses: actions/cache@v3
        with:
          path: |
            ~/vcpkg
            ./build/vcpkg_installed
            ${{ env.HOME }}/.cache/vcpkg/archives
            ${{ env.XDG_CACHE_HOME }}/vcpkg/archives
            ${{ env.LOCALAPPDATA }}\vcpkg\archives
            ${{ env.APPDATA }}\vcpkg\archives
          key: ${{ runner.os }}-${{ matrix.compiler }}-${{ env.BUILD_TYPE }}-${{ hashFiles('**/CMakeLists.txt') }}-${{ hashFiles('./vcpkg.json')}}
          restore-keys: |
            ${{ runner.os }}-${{ env.BUILD_TYPE }}-

      - name: Setup Cpp
        uses: aminya/setup-cpp@v1
        with:
          compiler: ${{ matrix.compiler }}
          vcvarsall: ${{ contains(matrix.os, 'windows') }}
          cmake: true
          ninja: true
          vcpkg: true
          cppcheck: true
          clangtidy: true # instead of `true`, which chooses the default version, you can pass a specific version.
          # ...
```

### Inside Docker

Here is an example for using setup-cpp to make a builder image that has the Cpp tools you need.

```dockerfile
#### Base Image
FROM ubuntu:22.04 as setup-cpp-ubuntu

RUN apt-get update -qq && \
    # install nodejs
    apt-get install -y --no-install-recommends nodejs npm && \
    # install setup-cpp
    npm install -g setup-cpp@v0.32.1 && \
    # install the compiler and tools
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

ENTRYPOINT ["/bin/bash"]

#### Building (example)
FROM setup-cpp-ubuntu AS builder

COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'

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
docker build -f ./dev/docker/setup-cpp-ubuntu.dockerfile -t setup-cpp-ubuntu .
```

Where you should use the path to the dockerfile after `-f`.

After build, run the following to start an interactive shell in your container

```shell
docker run -it setup-cpp
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
          - ubuntu-22.04
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

  # keys used by apt
  apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32
  apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5
  apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1E9377A2BA9EF27F

.setup-cpp: &setup-cpp |
  curl -LJO "https://github.com/aminya/setup-cpp/releases/download/v0.32.1/setup-cpp-x64-linux"
  chmod +x setup-cpp-x64-linux
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
