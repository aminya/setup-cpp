FROM ubuntu:22.04 AS base

RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends nodejs

# add setup_cpp.js
COPY "./dist/node12" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler mingw --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true

# clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm -rf /tmp/*

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

## setup vcpkg env. (triplets)
## https://github.com/microsoft/vcpkg/blob/master/docs/users/mingw.md
#ENV VCPKG_DEFAULT_HOST_TRIPLET "x64-linux"
#ENV VCPKG_DEFAULT_TRIPLET "x64-mingw-dynamic"
#ENV CC "x86_64-w64-mingw32-gcc"
#ENV CXX "x86_64-w64-mingw32-g++"
## use project_options cross-compiling to setup triplets ...

#### Building
FROM base AS builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build_cross_mingw'
