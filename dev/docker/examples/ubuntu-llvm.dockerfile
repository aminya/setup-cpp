#### Building (example)
FROM aminya/setup-cpp-ubuntu-llvm AS builder

COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN task build

#### Running environment
# use a fresh image as the runner
FROM ubuntu:22.04 AS runner

# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
