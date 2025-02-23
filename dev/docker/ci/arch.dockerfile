## base image
FROM archlinux:base AS arch-nodejs

RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
# install nodejs
    pacman -S --noconfirm --needed nodejs npm && \
# cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

FROM arch-nodejs AS setup-cpp-arch

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

# install the cpp tools
RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
    node /usr/lib/setup-cpp/setup-cpp.js \
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
