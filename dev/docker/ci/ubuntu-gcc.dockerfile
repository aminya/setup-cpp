FROM --platform=$BUILDPLATFORM setup-cpp-ubuntu:latest AS setup-cpp-ubuntu-gcc

# install gcc
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --compiler gcc && \
# cleanup
    nala autoremove -y && \
    nala autopurge -y && \
    apt-get clean && \
    nala clean --lists && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
