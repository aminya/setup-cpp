## base image
FROM fedora as base

# install nodejs and setup-cpp
RUN dnf -y install nodejs npm && \
    npm install -g setup-cpp

# add setup-cpp.js (built outside of this dockerfile)
COPY "./dist/legacy" "/"

# run installation
RUN node /setup-cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true

ENTRYPOINT ["/bin/bash"]

#### Building (example)
FROM base AS example-builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'

#### Running environment
# use a distroless image or ubuntu:22.04 if you wish
FROM gcr.io/distroless/cc as runner
# copy the built binaries and their runtime dependencies
COPY --from=example-builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
