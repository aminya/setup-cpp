# setup-cpp

Install all the tools required for building and testing C++/C projects.

![Build Status (Github Actions)](https://github.com/aminya/setup-cpp/workflows/CI/badge.svg)
[![Dependency Status](https://david-dm.org/aminya/setup-cpp.svg)](https://david-dm.org/aminya/setup-cpp)

Settting up a **cross-platform** enviroment for building and testing C++/C projects is a bit tricky. Each platform has its own comopilers, and each of them require a different installation procedure. This package aims to fix this issue.

This package is designed to be fully **modular** and as **minimal** as possible. This will allow you to only install the tools you want.

The package will be usable from any environment (locally, GitHub Actions, etc). Stay tuned for the stable release.

# Features (WIP)

- [x] setup cmake
- [x] setup ninja
- [x] setup llvm
- [x] setup conan
- [x] setup meson
- [x] setup gcovr
- [x] setup python
- [x] setup msvc
- [x] setup cppcheck
- [ ] setup gcc/mingw
- [ ] setup OpenCppCoverage
- [ ] setup doxygen
- [ ] setup vcpkg
