# a tiny debian with node installed
FROM node:16-slim

# add setup_cpp.js
ADD "./dist/" "/"
WORKDIR "/"

# install unzip for the slim image (a standard debian already has it)
RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends unzip

# run installation
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --ccache true --conan true

ENTRYPOINT [ "/bin/sh" ]