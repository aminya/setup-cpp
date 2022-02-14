# debian with node installed
FROM node:16

# add setup_cpp.js
ADD "./dist/" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true

# reload the environment
CMD source ~/.profile 

RUN clang --version
RUN cmake --version
RUN ninja --version
RUN ccache --version
RUN cppcheck --version
RUN vcpkg --version
RUN doxygen --version
RUN dot --version
RUN gcovr --version

ENTRYPOINT [ "/bin/sh" ]