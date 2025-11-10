## base image
FROM --platform=$BUILDPLATFORM fedora:44 AS fedora-nodejs

# install nodejs
RUN dnf -y install nodejs npm && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

FROM fedora-nodejs AS setup-cpp-fedora

COPY "./dist/modern" "/usr/lib/setup-cpp/"

# install the cpp tools
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
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
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
