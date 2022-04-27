FROM ubuntu:devel AS base

RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends nodejs

# add setup_cpp.js
ADD "./dist/" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --make true

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/sh" ]

#### Building
FROM base AS builder
ADD ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN make build

### Running environment
FROM gcr.io/distroless/cc
# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
