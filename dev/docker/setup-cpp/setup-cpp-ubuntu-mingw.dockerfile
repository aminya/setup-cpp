#### Base Image
FROM ubuntu:24.04 AS setup-cpp-ubuntu-mingw

RUN apt-get update -qq && \
# install nodejs
    apt-get install -y --no-install-recommends nodejs npm && \
# install setup-cpp
    npm install -g setup-cpp@v0.39.0 && \
# install the compiler and tools
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
