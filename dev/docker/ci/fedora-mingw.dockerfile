FROM --platform=$BUILDPLATFORM setup-cpp-fedora:latest AS setup-cpp-fedora-mingw

# install mingw
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --compiler mingw \
    --powershell true && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
