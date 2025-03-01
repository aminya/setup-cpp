FROM --platform=$BUILDPLATFORM aminya/setup-cpp-fedora:latest AS setup-cpp-fedora-gcc

# install gcc
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.js \
    --compiler gcc && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
