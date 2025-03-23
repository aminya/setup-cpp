FROM aminya/setup-cpp-alpine:latest AS setup-cpp-alpine-gcc

# install gcc
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
    --compiler gcc && \
# cleanup
    rm -rf /var/cache/apk/*

SHELL ["/entrypoint.sh", "/bin/sh", "-c"]
ENTRYPOINT ["/entrypoint.sh", "/bin/sh"]
