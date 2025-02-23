FROM setup-cpp-arch AS setup-cpp-arch-llvm

# install llvm
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --compiler llvm && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
