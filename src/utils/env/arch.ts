export const x86_64 = ["x64", "amd64", "x86_64", "win64", "64", "amd64_x86", "amd64_arm64"]
export const x86 = ["x86", "i386", "ia32", "win32", "32", "x32"]
export const arm64 = ["aarch64", "arm64", "woa64", "arm"]
export const armv7 = ["armv7", "armv7a"]
export const powerpc64le = ["powerpc64le", "ppc64le"]
export const sparc64 = ["sparc64"]
export const sparcv9 = ["sparcv9"]

export function getDebArch(arch: string) {
  if (arm64.includes(arch)) {
    return "arm64"
  } else if (x86_64.includes(arch)) {
    return "amd64"
  } else {
    return arch
  }
}
