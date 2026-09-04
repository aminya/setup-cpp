FROM aminya/setup-cpp-arch:latest AS setup-cpp-arch-gcc

# install llvm
RUN setup-cpp \
    --autoreconf true \
    --compiler gcc && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
