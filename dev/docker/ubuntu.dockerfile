#### Base Image
FROM ubuntu:22.04 as base

# install nodejs and setup-cpp
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends nodejs npm && \
    npm install -g setup-cpp

# install llvm, cmake, ninja, and ccache
RUN setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true --task true

ENTRYPOINT ["/bin/bash"]

#### Building (example)
FROM base as builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'


### Running environment
# use a distroless image or ubuntu:22.04 if you wish
FROM gcr.io/distroless/cc as runner
# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
