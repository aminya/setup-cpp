FROM --platform=$BUILDPLATFORM setup-cpp-fedora:latest AS setup-cpp-fedora-gcc

# install gcc
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --compiler gcc && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
