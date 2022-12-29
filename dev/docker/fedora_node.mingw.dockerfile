## base image
FROM fedora as base

# nodejs
RUN dnf -y install nodejs

# curl for downloading setup-cpp
RUN dnf -y install curl

# add setup_cpp.js
COPY "./dist/node12" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler mingw --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true

# clean up
RUN rm -rf /tmp/*

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

## setup vcpkg env. (triplets)
## https://github.com/microsoft/vcpkg/blob/master/docs/users/mingw.md
ENV VCPKG_DEFAULT_HOST_TRIPLET "x64-linux"
ENV VCPKG_DEFAULT_TRIPLET "x64-mingw-dynamic"
ENV CC "x86_64-w64-mingw32-gcc"
ENV CXX "x86_64-w64-mingw32-cpp"

# TODO: better setup for cmake toolchains ?
COPY ./dev/cmake/x86_64-w64-mingw32.toolchain.cmake /home/cmake/toolchains/x86_64-w64-mingw32.toolchain.cmake

#### Building
FROM base AS builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task cross_build_mingw'
