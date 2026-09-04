## base image
FROM --platform=$BUILDPLATFORM archlinux:base AS arch-nodejs

# Setup bash environment
RUN echo '[[ -f ~/.bashrc ]] && . ~/.bashrc' > /root/.bash_profile

RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
# install nodejs
    pacman -S --noconfirm --needed nodejs npm && \
# cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

FROM arch-nodejs AS setup-cpp-arch

COPY "./dist/modern" "/usr/lib/setup-cpp/"

ENV NODE_OPTIONS="--enable-source-maps"

RUN chmod +x /usr/lib/setup-cpp/setup-cpp.mjs && \
    ln -s /usr/lib/setup-cpp/setup-cpp.mjs /usr/local/bin/setup-cpp

# install the cpp tools
RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
    setup-cpp \
        --autoreconf true \
        --cmake true \
        --ninja true \
        --task true \
        --vcpkg true \
        --python true \
        --make true \
        --cppcheck true \
        --gcovr true \
        --doxygen true \
        --ccache true \
        --conan true \
        --cmakelang true \
        --meson true && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
