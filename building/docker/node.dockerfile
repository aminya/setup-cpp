#### Creating the container
FROM node:12-buster
ADD "./dist/" "/"
WORKDIR "/"
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --ccache true --conan true