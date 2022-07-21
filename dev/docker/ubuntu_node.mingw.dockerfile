FROM ubuntu:22.04 AS base

RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends nodejs

# add setup_cpp.js
COPY "./dist/" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler mingw --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true

## TODO: move powershell install into setup-cpp
# RUN node ./setup_cpp.js --powershell true
# install powershell (needed by vcpkg: Could not find Z_VCPKG_BUILTIN_POWERSHELL_PATH using the following names powershell)
RUN curl -sSL https://github.com/PowerShell/PowerShell/releases/download/v7.2.5/powershell-lts_7.2.5-1.deb_amd64.deb -o /tmp/powershell.deb && \
    apt-get update -y && apt-get install -y /tmp/powershell.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/* && \
    rm /tmp/powershell.deb

# clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm -rf /tmp/*

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

## setup vcpkg env. (triplets)
## https://github.com/microsoft/vcpkg/blob/master/docs/users/mingw.md
ENV VCPKG_DEFAULT_HOST_TRIPLET "x64-linux"
ENV VCPKG_DEFAULT_TRIPLET "x64-mingw-dynamic"
ENV CC "x86_64-w64-mingw32-gcc"
ENV CXX "x86_64-w64-mingw32-g++"

# TODO: better setup for cmake toolchains ?
COPY ./dev/cmake/x86_64-w64-mingw32.toolchain.cmake /home/cmake/x86_64-w64-mingw32.toolchain.cmake

#### Building
FROM base AS builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
# TODO: add cmake args: -DVCPKG_CHAINLOAD_TOOLCHAIN_FILE="/home/cmake/x86_64-w64-mingw32.toolchain.cmake" -DVCPKG_TARGET_TRIPLET="x64-mingw-dynamic"
#       or add `CONFIGURE_FLAGS: -DVCPKG_CHAINLOAD_TOOLCHAIN_FILE="/home/cmake/x86_64-w64-mingw32.toolchain.cmake" -DVCPKG_TARGET_TRIPLET="x64-mingw-dynamic"` into a new task mingw_build
RUN bash -c 'source ~/.cpprc \
    && task mingw_build'
