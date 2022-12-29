## base image
FROM archlinux as base

RUN pacman -Syuu --noconfirm
RUN pacman-db-upgrade

# yay for AUR installs
RUN pacman -S --noconfirm --needed git base-devel
## can't run makepkg as root, "ERROR: Running makepkg as root is not allowed as it can cause permanent, catastrophic damage to your system."
## add new user
RUN useradd -m -G nobody -s /bin/bash yay && passwd -d yay && echo "yay ALL=(ALL)  ALL" >> /etc/sudoers
RUN git clone --depth 1 https://aur.archlinux.org/yay.git /opt/yay && \
    chown -R yay:root /opt/yay && chmod -R 775 /opt/yay
USER yay
RUN cd /opt/yay && makepkg -si --noprogressbar --noconfirm
USER root
RUN rm -rf /tmp/yay

# nodejs
RUN pacman -S --noconfirm --needed nodejs

# curl for downloading setup-cpp
RUN pacman -S --noconfirm --needed curl

# add setup_cpp.js
COPY "./dist/node12" "/"
WORKDIR "/"

# run installation
RUN node ./setup_cpp.js --cmake true --ninja true --ccache true --vcpkg true --doxygen true --gcovr true --task true
## ERROR: Running makepkg as root is not allowed as it can cause permanent,
## Error: Command failed with exit code 1: sudo 'yay' '-S' '--noconfirm' 'powershell-bin'
## need to run this as yay-user so I can install powershell and mingw
USER yay
RUN node ./setup_cpp.js --compiler mingw --powershell true
USER root

# clean up
RUN pacman -Scc --noconfirm
RUN rm -rf /tmp/*

CMD source ~/.cpprc
ENTRYPOINT [ "/bin/bash" ]

## setup vcpkg env. (triplets)
## https://github.com/microsoft/vcpkg/blob/master/docs/users/mingw.md
ENV VCPKG_DEFAULT_HOST_TRIPLET "x64-linux"
ENV VCPKG_DEFAULT_TRIPLET "x64-mingw-dynamic"
ENV CC "x86_64-w64-mingw32-gcc"
ENV CXX "x86_64-w64-mingw32-g++"

# TODO: better setup for cmake toolchains ?
COPY ./dev/cmake/x86_64-w64-mingw32.toolchain.cmake /home/cmake/toolchains/x86_64-w64-mingw32.toolchain.cmake

#### Building
FROM base AS builder
COPY ./dev/cpp_vcpkg_project /home/app
WORKDIR /home/app
RUN bash -c 'source ~/.cpprc \
    && task cross_build_mingw'

