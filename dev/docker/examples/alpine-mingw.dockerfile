#### Cross Building (example)
FROM aminya/setup-cpp-alpine-mingw AS builder-mingw

COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build_cross_mingw'
