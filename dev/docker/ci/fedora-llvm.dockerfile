FROM aminya/setup-cpp-fedora:latest AS setup-cpp-fedora-llvm

# install llvm
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
    --compiler llvm && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
