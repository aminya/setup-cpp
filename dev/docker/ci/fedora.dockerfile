## base image
FROM fedora:40 AS fedora-nodejs

# install nodejs
RUN dnf -y install nodejs npm && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

FROM fedora-nodejs AS setup-cpp-fedora

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

# install the cpp tools
RUN node /usr/lib/setup-cpp/setup-cpp.js \
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
