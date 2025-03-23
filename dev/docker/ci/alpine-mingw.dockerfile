FROM aminya/setup-cpp-alpine:latest AS setup-cpp-alpine-mingw

COPY "./dist/modern" "/usr/lib/setup-cpp/"

# install mingw/powershell
RUN node --enable-source-maps /usr/lib/setup-cpp/setup-cpp.mjs \
    --compiler mingw \
    --powershell true && \
# cleanup
    rm -rf /var/cache/apk/*

SHELL ["/bin/bash", "-l", "-c"]
ENTRYPOINT ["/bin/bash", "-l"]
