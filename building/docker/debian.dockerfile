# debian
FROM debian:bullseye

# add setup_cpp
WORKDIR "/"
RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends wget
RUN wget --no-verbose "https://github.com/aminya/setup-cpp/releases/download/v0.9.3/setup_cpp_linux"
RUN chmod +x ./setup_cpp_linux

# install llvm, cmake, ninja, and ccache
RUN ./setup_cpp_linux --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

# reload the environment
CMD source ~/.profile 

ENTRYPOINT [ "/bin/sh" ]
