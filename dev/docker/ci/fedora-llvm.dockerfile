## base image
FROM fedora:41 AS setup-cpp-fedora

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

# install nodejs
RUN dnf -y install nodejs npm && \
# install the compiler and tools
    node /usr/lib/setup-cpp/setup-cpp.js \
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
