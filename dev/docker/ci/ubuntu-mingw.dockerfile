FROM setup-cpp-ubuntu AS setup-cpp-ubuntu-mingw

# install mingw/powershell
RUN node /usr/lib/setup-cpp/setup-cpp.js \
    --compiler mingw \
    --powershell true && \
# cleanup
    nala autoremove -y && \
    nala autopurge -y && \
    apt-get clean && \
    nala clean --lists && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]
