FROM aminya/setup-cpp-alpine:latest AS setup-cpp-alpine-mingw

# install mingw/powershell
RUN setup-cpp \
    --autoreconf true \
    --compiler mingw \
    --powershell true && \
# cleanup
    rm -rf /var/cache/apk/*

SHELL ["/entrypoint.sh", "/bin/sh", "-c"]
ENTRYPOINT ["/entrypoint.sh", "/bin/sh"]
