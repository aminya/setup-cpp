# debian
FROM debian:bullseye

# add setup_cpp
WORKDIR "/"
RUN apt-get update -qq && apt-get install -y --no-install-recommends wget
RUN wget "https://github.com/aminya/setup-cpp/releases/download/v0.2/setup_cpp_linux"
RUN chmod +x ./setup_cpp_linux

# install llvm, cmake, ninja, ccache, and conan
RUN ./setup_cpp --compiler llvm --cmake true --ninja true --ccache true --conan true

ENTRYPOINT [ "/bin/bash" ]
