## base image
FROM fedora:40 AS setup-cpp-fedora

# install nodejs
RUN dnf -y install nodejs npm && \
# install setup-cpp
    npm install -g setup-cpp@v1.0.1 && \
# install the compiler and tools
    NODE_OPTIONS="--enable-source-maps" \
    setup-cpp \
        --compiler llvm \
        --cmake true \
        --ninja true \
        --task true \
        --vcpkg true \
        --python true \
        --make true \
        --cppcheck true \
        --gcovr true \
        --doxygen true \
        --ccache true && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
