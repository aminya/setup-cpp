## base image
FROM archlinux as base

RUN pacman -Syuu --noconfirm

# Install packages available from standard repos
RUN pacman-db-upgrade && \
    pacman -S --noconfirm --needed \
        wget curl pkg-config zip unzip tar git && \
    pacman -S --noconfirm  \
        nodejs && \
    pacman -Scc --noconfirm

# install yay
#RUN useradd -m -G nobody -s /bin/bash yay && passwd -d yay && echo "yay ALL=(ALL)  ALL" >> /etc/sudoers
#RUN git clone --depth 1 https://aur.archlinux.org/yay.git /opt/yay && cd /opt/yay && \
#    chown -R yay:root . && chmod -R 775 . && \
#    runuser -l yay -c "cd /opt/yay && makepkg -si --noprogressbar --noconfirm"

# add setup_cpp.js
COPY "./dist/" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --compiler llvm --cmake true --ninja true --cppcheck true --ccache true --vcpkg true --doxygen true --gcovr true --task true

# clean up
RUN pacman -Scc --noconfirm
#RUN rm -rf /home/yay/.cache/*
RUN rm -rf /tmp/*

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

#### Building
FROM base AS builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build'

### Running environment
# use a distroless image or ubuntu:22.04 if you wish
FROM gcr.io/distroless/cc
# copy the built binaries and their runtime dependencies
COPY --from=builder /home/app/build/my_exe/Release/ /home/app/
WORKDIR /home/app/
ENTRYPOINT ["./my_exe"]
