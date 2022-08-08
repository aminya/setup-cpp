FROM ubuntu:22.04 AS base

RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends nodejs

# add setup_cpp.js
COPY "./dist/" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true

# clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm -rf /tmp/*

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

#### Building
FROM base AS builder
COPY ./dev/cpp_vcpkg_project /home/app
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
