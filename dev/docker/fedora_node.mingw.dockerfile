## base image
FROM fedora as base

# nodejs
RUN dnf -y install nodejs

# curl for downloading setup-cpp
RUN dnf -y install curl

# add setup_cpp.js
COPY "./dist/node12" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler mingw --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true

# clean up
RUN rm -rf /tmp/*

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

#### Building
FROM base AS builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build_cross_mingw'
