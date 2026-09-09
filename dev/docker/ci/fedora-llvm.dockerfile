FROM aminya/setup-cpp-fedora:latest AS setup-cpp-fedora-llvm

# install llvm
RUN setup-cpp \
    --compiler llvm && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
