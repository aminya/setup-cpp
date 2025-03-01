FROM --platform=$BUILDPLATFORM aminya/setup-cpp-arch:latest AS setup-cpp-arch-llvm

# install llvm
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.js \
    --compiler llvm && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
