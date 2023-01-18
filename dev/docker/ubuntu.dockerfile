#### Base Image
FROM ubuntu:22.04 AS base

# install setup-cpp
RUN apt-get update && apt-get install -y \
  npm \
  && rm -rf /var/lib/apt/lists/*
RUN npm install -g setup-cpp

# install llvm, cmake, ninja, and ccache
RUN setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true --task true

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

#### Building
FROM base AS builder
ADD ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'

### Running environment
# use a distroless image or ubuntu:22.04 if you wish
FROM gcr.io/distroless/cc
# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
