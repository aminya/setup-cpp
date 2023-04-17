FROM ubuntu:22.04 AS base

RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends nodejs

# install pnpm
RUN npm install -g pnpm@6.35.1

#### Building
FROM base AS builder
## https://github.com/ever0de/pnpm-docker-root-bug#how-to-fix
WORKDIR /workspace
COPY . .
RUN pnpm install


#### setup-cpp
FROM base AS setup-cpp
# add setup-cpp.js
COPY --from=builder /workspace/dist/node12 /
# run installation
RUN . $NVM_DIR/nvm.sh && node /setup-cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true
CMD ["source", "~/.cpprc"]
ENTRYPOINT ["/bin/bash"]


#### Building (example)
FROM setup-cpp AS example-builder
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
