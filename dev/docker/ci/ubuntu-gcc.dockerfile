FROM --platform=$BUILDPLATFORM aminya/setup-cpp-ubuntu:latest AS setup-cpp-ubuntu-gcc

# install gcc
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.js \
    --compiler gcc && \
# cleanup
    nala autoremove -y && \
    nala autopurge -y && \
    apt-get clean && \
    nala clean --lists && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
