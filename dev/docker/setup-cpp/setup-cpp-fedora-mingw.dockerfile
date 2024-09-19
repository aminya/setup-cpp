## base image
FROM fedora:40 AS setup-cpp-fedora-mingw

# install nodejs
RUN dnf -y install nodejs npm && \
# install setup-cpp
    npm install -g setup-cpp@v0.42.0 && \
# install the compiler and tools
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

ENTRYPOINT ["/bin/bash"]
