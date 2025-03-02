FROM --platform=$BUILDPLATFORM aminya/setup-cpp-arch:latest AS setup-cpp-arch-mingw

# install mingw/powershell
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
    --compiler mingw \
    --powershell true && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
