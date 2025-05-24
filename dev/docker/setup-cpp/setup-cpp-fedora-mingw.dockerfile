## base image
FROM fedora:43 AS setup-cpp-fedora-mingw

# install nodejs
RUN dnf -y install nodejs npm && \
# install setup-cpp
    npm install -g setup-cpp@v1.1.1 && \
# install the compiler and tools
    NODE_OPTIONS="--enable-source-maps" \
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
        --ccache true \
        --powershell true && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
