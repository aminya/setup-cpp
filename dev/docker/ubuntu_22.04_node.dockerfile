FROM ubuntu:22.04 AS base

# set time-zone
ENV TZ=Canada/Pacific
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# The nodejs that ships on ubuntu:20.04 servers is too old.
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update -qq
RUN apt-get install -y --no-install-recommends curl gnupg ca-certificates
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y --no-install-recommends nodejs

# add setup_cpp.js
COPY "./dist/node12" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

#### Building
FROM base AS builder
ADD ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'

### Running environment
# use a distroless image or ubuntu:20.04 if you wish
FROM gcr.io/distroless/cc
# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
