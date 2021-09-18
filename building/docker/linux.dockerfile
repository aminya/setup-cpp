# A tiny debian with node binary installed
FROM node:12-slim

# add setup_cpp.js
ADD "./dist/" "/"
WORKDIR "/"

# install unzip and xz-utils for the slim image (a standard debian already has these)
RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends unzip

# run installation
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --ccache true --conan true

ENTRYPOINT [ "/bin/sh" ]