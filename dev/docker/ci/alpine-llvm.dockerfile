FROM aminya/setup-cpp-alpine:latest AS setup-cpp-alpine-llvm

# install llvm
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
    --compiler llvm && \
# cleanup
    rm -rf /var/cache/apk/*

SHELL ["/entrypoint.sh", "/bin/sh", "-c"]
ENTRYPOINT ["/entrypoint.sh", "/bin/sh"]
