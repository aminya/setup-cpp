FROM aminya/setup-cpp-ubuntu:latest AS setup-cpp-ubuntu-gcc

# install gcc
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
    --compiler gcc && \
# cleanup
    apt-get clean autoclean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
