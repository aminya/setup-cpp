FROM --platform=$BUILDPLATFORM aminya/setup-cpp-fedora:latest AS setup-cpp-fedora-mingw

# install mingw
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.js \
    --compiler mingw \
    --powershell true && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
