## base image
FROM archlinux:base as setup-cpp-arch-mingw

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
    # install nodejs
    pacman -S --noconfirm --needed nodejs npm && \
    
    # install the compiler and tools
    node /usr/lib/setup-cpp/setup-cpp.js \
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
        --ccache true \
        --powershell true && \
    # arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]

#### Cross Building (example)
FROM setup-cpp-arch-mingw AS builder-mingw

COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build_cross_mingw'
