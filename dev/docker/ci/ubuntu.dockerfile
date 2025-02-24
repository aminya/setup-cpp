#### Base Image with Node.js
FROM ubuntu:22.04 AS ubuntu-nodejs

# install latest nodejs
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends curl gnupg ca-certificates && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update -qq && \
    apt-get install -y --no-install-recommends nodejs && \
# cleanup
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

#### Base Image with Tools
FROM ubuntu-nodejs AS setup-cpp-ubuntu

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

# install the cpp tools
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --nala true \
    --cmake true \
    --ninja true \
    --task true \
    --python true \
    --make true \
    --cppcheck true \
    --gcovr true \
    --doxygen true \
    --ccache true && \
# install vcpkg if the architecture is amd64
    dpkgArch="$(dpkg --print-architecture)" && \
    case "${dpkgArch##*-}" in \
        amd64) node /usr/lib/setup-cpp/setup-cpp.js --vcpkg true ;; \
        *) echo >&2 "unsupported vcpkg architecture: ${dpkgArch}" ;; \
    esac && \
# cleanup
    nala autoremove -y && \
    nala autopurge -y && \
    apt-get clean && \
    nala clean --lists && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*
