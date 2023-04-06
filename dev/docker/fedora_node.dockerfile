## base image
FROM fedora as base

# nodejs and curl for downloading setup-cpp
RUN dnf -y install nodejs curl

# add setup-cpp.js
COPY "./dist/node16" "/"
WORKDIR "/"

# run installation
RUN node ./setup-cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true --powershell true

CMD ["source", "~/.cpprc"]
ENTRYPOINT [ "/bin/bash" ]


#### Building
FROM base as builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'


### Running environment
# use a distroless image or ubuntu:22.04 if you wish
FROM gcr.io/distroless/cc as runner
# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
