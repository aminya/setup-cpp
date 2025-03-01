#### Base Image
FROM ubuntu:20.04 AS setup-cpp-ubuntu-mingw

RUN apt-get update -qq && \
# install latest nodejs on ubuntu 20.04
    apt-get update -qq && \
    apt-get install -y --no-install-recommends curl gnupg ca-certificates && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update -qq && \
    apt-get install -y --no-install-recommends nodejs && \
# install setup-cpp
    npm install -g setup-cpp@v0.46.2 && \
# install the compiler and tools
    NODE_OPTIONS="--enable-source-maps" \
    setup-cpp \
        --nala true \
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
    nala autoremove -y && \
    nala autopurge -y && \
    apt-get clean && \
    nala clean --lists && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
