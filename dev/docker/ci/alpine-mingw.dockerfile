FROM aminya/setup-cpp-alpine:latest AS setup-cpp-alpine-mingw

# install mingw/powershell
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
    --compiler mingw \
    --powershell true && \
# cleanup
    rm -rf /var/cache/apk/*

SHELL ["/entrypoint.sh", "/bin/sh", "-c"]
ENTRYPOINT ["/entrypoint.sh", "/bin/sh"]
