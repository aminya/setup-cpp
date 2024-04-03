#### Base Image
FROM ubuntu:22.04 AS setup-cpp-ubuntu-mingw

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

RUN apt-get update -qq && \
# install nodejs
    apt-get install -y --no-install-recommends nodejs npm && \
# install the compiler and tools
    node /usr/lib/setup-cpp/setup-cpp.js \
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
