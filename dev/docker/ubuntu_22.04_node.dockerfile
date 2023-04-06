FROM ubuntu:22.04 as base

# set time-zone
ENV TZ=Canada/Pacific
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# install node with nvm
RUN apt-get update -qq && apt-get install -y --no-install-recommends git curl wget ca-certificates
ARG nvm_version="0.39.3"
ARG node_version="18.15.0"
RUN mkdir /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ADD https://raw.githubusercontent.com/nvm-sh/nvm/v${nvm_version}/install.sh /nvm_install.sh
RUN chmod +x /nvm_install.sh && /nvm_install.sh \
    && . $NVM_DIR/nvm.sh \
    && nvm install $node_version \
    && nvm alias default $node_version \
    && nvm use default
ENV NODE_PATH $NVM_DIR/v${node_version}/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v${node_version}/bin:$PATH

# add setup-cpp.js
COPY "./dist/node18" "/"
WORKDIR "/"

# run installation
RUN node ./setup-cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true

CMD ["source", "~/.cpprc"]
ENTRYPOINT ["/bin/bash"]


#### Building
FROM base as builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'


### Running environment
# use a distroless image or ubuntu:20.04 if you wish
FROM gcr.io/distroless/cc as runner
# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
