#### Base Image
FROM ubuntu:22.04 as setup-cpp-ubuntu

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

RUN apt-get update -qq && \
    # install nodejs
    apt-get install -y --no-install-recommends nodejs npm

    # install the compiler and tools
RUN node /usr/lib/setup-cpp/setup-cpp.js \
        --gcovr true && \
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
