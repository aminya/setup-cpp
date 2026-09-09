FROM aminya/setup-cpp-fedora:latest AS setup-cpp-fedora-mingw

# install mingw
RUN setup-cpp \
    --compiler mingw \
    --powershell true && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
