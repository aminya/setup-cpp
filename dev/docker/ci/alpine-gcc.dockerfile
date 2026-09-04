FROM aminya/setup-cpp-alpine:latest AS setup-cpp-alpine-gcc

# install gcc
RUN setup-cpp \
    --autoreconf true \
    --compiler gcc && \
# cleanup
    rm -rf /var/cache/apk/*

SHELL ["/entrypoint.sh", "/bin/sh", "-c"]
ENTRYPOINT ["/entrypoint.sh", "/bin/sh"]
