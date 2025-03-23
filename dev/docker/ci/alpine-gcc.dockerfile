FROM aminya/setup-cpp-alpine:latest AS setup-cpp-alpine-gcc

# install gcc
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
    --compiler gcc && \
# cleanup
    apk del --purge apk-tools && \
    rm -rf /var/cache/apk/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
