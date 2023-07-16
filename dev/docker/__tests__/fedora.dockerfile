## base image
FROM fedora:38 as setup-cpp-fedora

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

# install nodejs
RUN dnf -y install nodejs npm && \
    # install setup-cpp
    npm install -g setup-cpp@v0.31.0 && \
    # install the compiler and tools
    node /usr/lib/setup-cpp/setup-cpp.js \
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
    dnf clean all && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]

#### Building (example)
FROM setup-cpp-fedora AS builder

COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'

#### Running environment
# use a fresh image as the runner
FROM fedora:38 as runner

# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
