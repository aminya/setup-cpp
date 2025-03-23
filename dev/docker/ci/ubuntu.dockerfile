ARG BASE_VERSION=22.04

#### Base Image with Node.js
FROM --platform=$BUILDPLATFORM ubuntu:${BASE_VERSION} AS ubuntu-nodejs

# install latest nodejs
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends curl gnupg ca-certificates && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update -qq && \
    apt-get install -y --no-install-recommends nodejs && \
# cleanup
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

#### Base Image with Tools
FROM ubuntu-nodejs AS setup-cpp-ubuntu

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
    apt-get clean autoclean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
