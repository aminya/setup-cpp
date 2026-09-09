FROM aminya/setup-cpp-arch:latest AS setup-cpp-arch-llvm

# install llvm
RUN setup-cpp \
    --compiler llvm && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
