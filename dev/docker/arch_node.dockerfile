## base image
FROM archlinux as base

# install nodejs and pnpm
RUN pacman -Syuu --noconfirm && pacman-db-upgrade && pacman -S --noconfirm --needed nodejs npm git \
    && npm install -g pnpm


#### Building
FROM base AS builder
## https://github.com/ever0de/pnpm-docker-root-bug#how-to-fix
WORKDIR /workspace
COPY . .
RUN pnpm install


#### setup-cpp
FROM base AS setup-cpp
# add setup-cpp.js
COPY --from=builder /workspace/dist/node18 /
# run installation
RUN node /setup-cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true
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
