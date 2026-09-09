FROM aminya/setup-cpp-arch:latest AS setup-cpp-arch-mingw

# install mingw/powershell
RUN setup-cpp \
    --compiler mingw \
    --powershell true && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
