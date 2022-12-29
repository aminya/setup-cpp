FROM ubuntu:22.04 AS base

RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends nodejs

# add setup_cpp.js
COPY "./dist/node12" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler mingw --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true

# clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm -rf /tmp/*

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

#### Building
FROM base AS builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build_cross_mingw'
