## base image
FROM archlinux:base AS setup-cpp-arch-mingw

RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
# install nodejs
    pacman -S --noconfirm --needed nodejs npm && \
# install setup-cpp
    npm install -g setup-cpp@v0.38.3 && \
# install the compiler and tools
    setup-cpp \
        --compiler mingw \
        --cmake true \
        --ninja true \
        --task true \
        --vcpkg true \
        --python true \
        --make true \
        --cppcheck true \
        --gcovr true \
        --doxygen true \
        --ccache true && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
