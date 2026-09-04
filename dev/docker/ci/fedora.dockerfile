## base image
FROM --platform=$BUILDPLATFORM fedora:44 AS fedora-nodejs

# install nodejs
RUN dnf -y install nodejs npm && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

FROM fedora-nodejs AS setup-cpp-fedora

COPY "./dist/modern" "/usr/lib/setup-cpp/"

ENV NODE_OPTIONS="--enable-source-maps"

RUN chmod +x /usr/lib/setup-cpp/setup-cpp.mjs && \
    ln -s /usr/lib/setup-cpp/setup-cpp.mjs /usr/local/bin/setup-cpp

# install the cpp tools
RUN setup-cpp \
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
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
