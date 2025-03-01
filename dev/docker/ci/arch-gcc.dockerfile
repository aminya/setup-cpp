FROM --platform=$BUILDPLATFORM setup-cpp-arch:latest AS setup-cpp-arch-gcc

# install llvm
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.js \
    --compiler gcc && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
