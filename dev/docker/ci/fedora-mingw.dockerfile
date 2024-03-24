## base image
FROM fedora:40 as setup-cpp-fedora-mingw

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

# install nodejs
RUN dnf -y install nodejs npm && \
    
    # install the compiler and tools
    node /usr/lib/setup-cpp/setup-cpp.js \
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
