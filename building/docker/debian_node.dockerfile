# debian with node installed
FROM node:16

# add setup_cpp.js
ADD "./dist/" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --ccache true

ENTRYPOINT [ "/bin/sh" ]