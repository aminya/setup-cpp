# setup-cpp

Install all the tools required for building and testing C++/C projects.

![Build Status (Github Actions)](https://github.com/aminya/setup-cpp/workflows/CI/badge.svg)
[![Dependency Status](https://david-dm.org/aminya/setup-cpp.svg)](https://david-dm.org/aminya/setup-cpp)

Setting up a **cross-platform** environment for building and testing C++/C projects is a bit tricky. Each platform has its own compilers, and each of them requires a different installation procedure. This package aims to fix this issue.

This package is designed to be **modular** and as **minimal** as possible. This will allow you to install the tools you want. It is continuously tested on Windows, Linux, and macOS.

The package can be used locally or from CI services like GitHub Actions. Stay tuned for the stable release.

# Features

`setup-cpp` can install all of these tools:

- llvm
- gcc
- cmake
- ninja
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

You should download the exe file or the js file (if have Nodejs installed), and run it with the available options.

Tip: You can automate downloading using `wget`, `curl` or other similar tools.

### Executable

Download the executable for your platform from [here](https://github.com/aminya/setup-cpp/releases/tag/v0.2.1), and run it with the available options.

An example that installs llvm, cmake, ninja, ccache, and conan:

```ps1
# windows example (open shell as admin)
curl -O "https://github.com/aminya/setup-cpp/releases/download/v0.2.1/setup_cpp_windows.exe"
./setup_cpp_windows --compiler llvm --cmake true --ninja true --ccache true --conan true
```

```ps1
# linux example
wget "https://github.com/aminya/setup-cpp/releases/download/v0.2.1/setup_cpp_linux"
chmod +x setup_cpp_linux
sudo ./setup_cpp_linux --compiler llvm --cmake true --ninja true --ccache true --conan true
```

```ps1
# mac example
wget "https://github.com/aminya/setup-cpp/releases/download/v0.2.1/setup_cpp_mac"
chmod +x setup_cpp_mac
sudo ./setup_cpp_mac --compiler llvm --cmake true --ninja true --ccache true --conan true
```

NOTE: In the `compiler` entry, you can specify the version after `-` like `llvm-11`.
For the tools, instead of `true`, which chooses the default version, you can pass a specific version.

### With Nodejs

Download the `setup_cpp.js` file form [here](https://github.com/aminya/setup-cpp/releases/download/v0.2.1/setup_cpp.js), and run it with the available options.

On Windows

```ps1
# open shell as admin
curl "https://github.com/aminya/setup-cpp/releases/download/v0.2.1/setup_cpp.js"
node ./setup_cpp.js --compiler llvm --cmake true --ninja true --ccache true --conan true
```

On Linux or Mac:

```ps1
wget "https://github.com/aminya/setup-cpp/releases/download/v0.2.1/setup_cpp.js"
sudo node ./setup_cpp.js --compiler llvm --cmake true --ninja true --ccache true --conan true
```

# Inside GitHub Actions

Here is a complete cross-platform example that tests llvm and gcc. It also uses cmake, ninja, conan, cppcheck, and ccache.

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
          # you can specify the version after `-` like `llvm-11`.
    steps:
      - name: Setup Cpp
        uses: aminya/setup-cpp@v1
        with:
          compiler: ${{ matrix.compiler }}
          cmake: true
          ninja: true
          conan: true
          cppcheck: true
          ccache: true # instead of `true`, which chooses the default version, you can pass a specific version.
          # add any tool that you need here...
```

# Inside Docker

Here is an example for using setup_cpp to make a builder image that has the cpp tools you need.

```dockerfile
# debian
FROM debian:bullseye

# add setup_cpp
WORKDIR "/"
RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y --no-install-recommends ca-certificates wget unzip
RUN wget --no-verbose "https://github.com/aminya/setup-cpp/releases/download/v0.2.1/setup_cpp_linux"
RUN chmod +x ./setup_cpp_linux

# install llvm, cmake, ninja, ccache, and conan
RUN ./setup_cpp_linux --compiler llvm --cmake true --ninja true --ccache true --conan true

ENTRYPOINT [ "/bin/bash" ]
```

See [this folder](https://github.com/aminya/setup-cpp/tree/master/building/docker), for some dockerfile examples.

If you want to build the ones included, then run:

```ps1
docker build -f ./building/docker/debian.dockerfile -t setup_cpp .
```

After `-f` use the docker file name.

### Incomplete

- [ ] msvc. It is implemented, but has bugs. See [this issue](https://github.com/aminya/cpp/issues/1)
- [ ] vcpkg (TODO)
