#!/bin/bash -e

# This script will remove the llvm repository from the system
# It's the opposite of https://apt.llvm.org/llvm.sh

set -eux

CURRENT_LLVM_STABLE=18
BASE_URL="http://apt.llvm.org"

# Check for required tools
needed_binaries=(lsb_release wget add-apt-repository gpg)
missing_binaries=()
for binary in "${needed_binaries[@]}"; do
    if ! which $binary &>/dev/null ; then
        missing_binaries+=($binary)
    fi
done
if [[ ${#missing_binaries[@]} -gt 0 ]] ; then
    echo "You are missing some tools this script requires: ${missing_binaries[@]}"
    echo "(hint: apt install lsb-release wget software-properties-common gnupg)"
    exit 4
fi

# Set default values for commandline arguments
# We default to the current stable branch of LLVM
LLVM_VERSION=$CURRENT_LLVM_STABLE
ALL=0
DISTRO=$(lsb_release -is)
VERSION=$(lsb_release -sr)
UBUNTU_CODENAME=""
CODENAME_FROM_ARGUMENTS=""
# Obtain VERSION_CODENAME and UBUNTU_CODENAME (for Ubuntu and its derivatives)
source /etc/os-release
DISTRO=${DISTRO,,}
case ${DISTRO} in
    debian)
        # Debian Trixie has a workaround because of
        # https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=1038383
        if [[ "${VERSION}" == "unstable" ]] || [[ "${VERSION}" == "testing" ]] || [[ "${VERSION_CODENAME}" == "trixie" ]]; then
            CODENAME=unstable
            LINKNAME=
        else
            # "stable" Debian release
            CODENAME=${VERSION_CODENAME}
            LINKNAME=-${CODENAME}
        fi
        ;;
    *)
        # ubuntu and its derivatives
        if [[ -n "${UBUNTU_CODENAME}" ]]; then
            CODENAME=${UBUNTU_CODENAME}
            if [[ -n "${CODENAME}" ]]; then
                LINKNAME=-${CODENAME}
            fi
        fi
        ;;
esac

# read optional command line arguments
if [ "$#" -ge 1 ] && [ "${1::1}" != "-" ]; then
    if [ "$1" != "all" ]; then
        LLVM_VERSION=$1
    else
        # special case for ./llvm.sh all
        ALL=1
    fi
    OPTIND=2
    if [ "$#" -ge 2 ]; then
      if [ "$2" == "all" ]; then
          # Install all packages
          ALL=1
          OPTIND=3
      fi
    fi
fi

while getopts ":hm:n:" arg; do
    case $arg in
    h)
        usage
        ;;
    m)
        BASE_URL=${OPTARG}
        ;;
    n)
        CODENAME=${OPTARG}
        if [[ "${CODENAME}" == "unstable" ]]; then
            # link name does not apply to unstable repository
            LINKNAME=
        else
            LINKNAME=-${CODENAME}
        fi
        CODENAME_FROM_ARGUMENTS="true"
        ;;
    esac
done

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root!"
   exit 1
fi

declare -A LLVM_VERSION_PATTERNS
LLVM_VERSION_PATTERNS[9]="-9"
LLVM_VERSION_PATTERNS[10]="-10"
LLVM_VERSION_PATTERNS[11]="-11"
LLVM_VERSION_PATTERNS[12]="-12"
LLVM_VERSION_PATTERNS[13]="-13"
LLVM_VERSION_PATTERNS[14]="-14"
LLVM_VERSION_PATTERNS[15]="-15"
LLVM_VERSION_PATTERNS[16]="-16"
LLVM_VERSION_PATTERNS[17]="-17"
LLVM_VERSION_PATTERNS[18]="-18"
LLVM_VERSION_PATTERNS[19]="-19"
LLVM_VERSION_PATTERNS[20]=""

if [ ! ${LLVM_VERSION_PATTERNS[$LLVM_VERSION]+_} ]; then
    echo "This script does not support LLVM version $LLVM_VERSION"
    exit 3
fi

LLVM_VERSION_STRING=${LLVM_VERSION_PATTERNS[$LLVM_VERSION]}

# join the repository name
if [[ -n "${CODENAME}" ]]; then
    REPO_NAME="deb ${BASE_URL}/${CODENAME}/  llvm-toolchain${LINKNAME}${LLVM_VERSION_STRING} main"

    # check if the repository exists for the distro and version
    if ! wget -q --method=HEAD ${BASE_URL}/${CODENAME} &> /dev/null; then
        if [[ -n "${CODENAME_FROM_ARGUMENTS}" ]]; then
            echo "Specified codename '${CODENAME}' is not supported by this script."
        else
            echo "Distribution '${DISTRO}' in version '${VERSION}' is not supported by this script."
        fi
        exit 2
    fi
fi

if [[ "${VERSION_CODENAME}" == "bookworm" ]]; then
    # add it twice to workaround:
    # https://github.com/llvm/llvm-project/issues/62475
    add-apt-repository -y "${REPO_NAME}"
fi

add-apt-repository -y --no-update --remove "${REPO_NAME}"
apt-get update
