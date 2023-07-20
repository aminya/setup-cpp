## base image
FROM archlinux:base-devel as setup-cpp-arch-mingw

COPY "./dist/legacy" "/usr/lib/setup-cpp/"

# install git
RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
    pacman -S --noconfirm --needed git
# install yay
RUN useradd -m -G nobody -s /bin/bash yay && passwd -d yay && echo "yay ALL=(ALL)  ALL" >> /etc/sudoers
RUN git clone --depth 1 https://aur.archlinux.org/yay.git /opt/yay 
WORKDIR /opt/yay
RUN chown -R yay:root . && chmod -R 775 .
USER yay
WORKDIR /opt/yay
RUN makepkg -si --noprogressbar --noconfirm
## clean up
USER root
WORKDIR /
RUN rm -rf /opt/yay

RUN pacman -Syuu --noconfirm && \
    pacman-db-upgrade && \
    # install nodejs
    pacman -S --noconfirm --needed nodejs npm && \
    # install the compiler and tools
    node /usr/lib/setup-cpp/setup-cpp.js \
        --compiler mingw \
        --cmake true \
        --ninja true \
        --task true \
        --vcpkg true \
        --python true \
        --make true \
        --cppcheck true \
        --gcovr true \
        --doxygen true \
        --ccache true && \
    # arch cleanup
    pacman -Scc --noconfirm && \
    rm -rf /var/cache/pacman/pkg/* && \
    rm -rf /tmp/*

ENTRYPOINT ["/bin/bash"]

#### Cross Building (example)
FROM setup-cpp-arch-mingw AS builder-mingw

COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task build_cross_mingw'
