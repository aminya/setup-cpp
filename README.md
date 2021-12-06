# setup-cpp

Install all the tools required for building and testing C++/C projects.

![Build Status (Github Actions)](https://github.com/aminya/setup-cpp/workflows/CI/badge.svg)
[![Dependency Status](https://david-dm.org/aminya/setup-cpp.svg)](https://david-dm.org/aminya/setup-cpp)

Setting up a **cross-platform** environment for building and testing C++/C projects is a bit tricky. Each platform has its own compilers, and each of them requires a different installation procedure. This package aims to fix this issue.

This package is designed to be **modular** and as **minimal** as possible. This will allow you to install the tools you want. It is continuously tested on Windows, Linux, and macOS.

The package can be used locally or from CI services like GitHub Actions.

# Features

`setup-cpp` can install all of these tools:

- cmake
- ninja
- llvm
- gcc
- msvc
- vcvarsall
- vcpkg
- meson
- conan
- ccache
- cppcheck
- doxygen
- gcovr
- opencppcoverage
- python
- choco
- brew

# Usage

# From Terminal

You should download the executable file or the js file (if Nodejs installed), and run it with the available options.

Tip: You can automate downloading using `wget`, `curl`, or other similar tools.

### Executable

Download the executable for your platform from [here](https://github.com/aminya/setup-cpp/releases/tag/v0.4.0), and run it with the available options.

An example that installs llvm, cmake, ninja, ccache, and vcpkg:

```ps1
# windows example (open shell as admin)
curl -LJO "https://github.com/aminya/setup-cpp/releases/download/v0.4.0/setup_cpp_windows.exe"
./setup_cpp_windows --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
```

```ps1
# linux example
wget "https://github.com/aminya/setup-cpp/releases/download/v0.4.0/setup_cpp_linux"
chmod +x setup_cpp_linux
sudo ./setup_cpp_linux --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
```

```ps1
# mac example
wget "https://github.com/aminya/setup-cpp/releases/download/v0.4.0/setup_cpp_mac"
chmod +x setup_cpp_mac
sudo ./setup_cpp_mac --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
```

NOTE: In the `compiler` entry, you can specify the version after `-` like `llvm-11`.
For the tools, instead of `true` that chooses the default version, you can pass a specific version.

### With Nodejs

Download the `setup_cpp.js` file form [here](https://github.com/aminya/setup-cpp/releases/download/v0.4.0/setup_cpp.js), and run it with the available options.

On Windows:

Open the shell as admin, download via `curl`, then install
```ps1
# open shell as admin
curl -LJO "https://github.com/aminya/setup-cpp/releases/download/v0.4.0/setup_cpp.js"
node ./setup_cpp.js --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
```

On Linux or Mac:

```ps1
wget "https://github.com/aminya/setup-cpp/releases/download/v0.4.0/setup_cpp.js"
sudo node ./setup_cpp.js --compiler llvm --cmake true --ninja true --ccache true --vcpkg true
```

# Inside GitHub Actions

Here is a complete cross-platform example that tests llvm and gcc. It also uses cmake, ninja, vcpkg, cppcheck, and ccache.

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
          - windows-2019
          - ubuntu-20.04
          - macos-10.15
        compiler:
          - llvm
          - gcc
          # you can specify the version after `-` like `llvm-13.0.0`.
        include:
          - os: "windows-latest"
            compiler: "msvc"
    steps:
      - name: Cache
        uses: actions/cache@v2
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
            ${{ runner.os }}-${{ env.BUILD_TYPE }}

      - name: Setup Cpp
        uses: aminya/setup-cpp@v1
        with:
          compiler: ${{ matrix.compiler }}
          cmake: true
          ninja: true
          vcpkg: true
          cppcheck: true # instead of `true`, which chooses the default version, you can pass a specific version.
          # add any tool that you need here...
```

# Inside Docker

Here is an example for using setup_cpp to make a builder image that has the Cpp tools you need.

```dockerfile
# debian
FROM debian:bullseye

# add setup_cpp
WORKDIR "/"
RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y --no-install-recommends ca-certificates wget unzip
RUN wget --no-verbose "https://github.com/aminya/setup-cpp/releases/download/v0.4.0/setup_cpp_linux"
RUN chmod +x ./setup_cpp_linux

# install llvm, cmake, ninja, ccache, and vcpkg
RUN ./setup_cpp_linux --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

ENTRYPOINT [ "/bin/sh" ]
```

See [this folder](https://github.com/aminya/setup-cpp/tree/master/building/docker), for some dockerfile examples.

If you want to build the ones included, then run:

```ps1
docker build -f ./building/docker/debian.dockerfile -t setup_cpp .
```

Where you should use the path to the docker after `-f`.

After build, run the following to start an interactive shell in your container

```ps1
docker run -it setup_cpp
```
