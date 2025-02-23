FROM setup-cpp-arch AS setup-cpp-arch-mingw

# install mingw/powershell
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --compiler mingw \
    --powershell true && \
# arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
