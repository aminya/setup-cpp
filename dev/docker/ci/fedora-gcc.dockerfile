FROM aminya/setup-cpp-fedora:latest AS setup-cpp-fedora-gcc

# install gcc
RUN setup-cpp \
    --autoreconf true \
    --compiler gcc && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
