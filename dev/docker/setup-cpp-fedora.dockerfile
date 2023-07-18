## base image
FROM fedora:38 as setup-cpp-fedora

# install nodejs
RUN dnf -y install nodejs npm && \
    # install setup-cpp
    npm install -g setup-cpp@v0.32.1 && \
    # install the compiler and tools
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
