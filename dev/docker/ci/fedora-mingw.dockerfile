## base image
FROM fedora:46 AS setup-cpp-fedora-mingw

COPY "./dist/modern" "/usr/lib/setup-cpp/"

ENV NODE_OPTIONS="--enable-source-maps"

RUN chmod +x /usr/lib/setup-cpp/setup-cpp.mjs && \
    ln -s /usr/lib/setup-cpp/setup-cpp.mjs /usr/local/bin/setup-cpp

# install nodejs
RUN dnf -y install nodejs npm && \
# install the compiler and tools
    NODE_OPTIONS="--enable-source-maps" \
    setup-cpp \
        --autoreconf true \
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
