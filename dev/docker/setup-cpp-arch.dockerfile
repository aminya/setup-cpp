## base image
FROM archlinux:base as setup-cpp-arch

RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
    # install nodejs
    pacman -S --noconfirm --needed nodejs npm && \
    # install setup-cpp
    npm install -g setup-cpp@v0.36.0 && \
    # install the compiler and tools
    setup-cpp \
        --compiler llvm \
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
