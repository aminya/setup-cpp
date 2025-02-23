FROM setup-cpp-fedora AS setup-cpp-ubuntu-llvm

# install mingw
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --compiler mingw \
    --powershell true && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
