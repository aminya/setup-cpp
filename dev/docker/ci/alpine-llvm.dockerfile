FROM aminya/setup-cpp-alpine:latest AS setup-cpp-alpine-llvm

# install llvm
RUN setup-cpp \
    --autoreconf true \
    --compiler llvm && \
# cleanup
    rm -rf /var/cache/apk/*

SHELL ["/entrypoint.sh", "/bin/sh", "-c"]
ENTRYPOINT ["/entrypoint.sh", "/bin/sh"]
