ARG BASE_VERSION=22-alpine3.21

#### Base Image with Node.js
FROM --platform=$BUILDPLATFORM node:${BASE_VERSION} AS alpine-nodejs

#### Base Image with Tools
FROM alpine-nodejs AS setup-cpp-alpine

COPY "./dist/modern" "/usr/lib/setup-cpp/"

# install the cpp tools
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
        --cmake true \
        --ninja true \
        --task true \
        --python true \
        --make true \
        --cppcheck true \
        --gcovr true \
        --doxygen true \
        --vcpkg true \
        --ccache true \
        --conan true \
        --cmakelang true \
        --meson true && \
# cleanup
    apk del --purge apk-tools && \
    rm -rf /var/cache/apk/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
