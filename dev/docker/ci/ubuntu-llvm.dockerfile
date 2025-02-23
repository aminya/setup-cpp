FROM setup-cpp-ubuntu AS setup-cpp-ubuntu-llvm

# install llvm
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --compiler llvm && \
# cleanup
    dnf clean all && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
