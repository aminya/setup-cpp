import which from "which"

/**
 * Check if nala is installed
 */
export function hasNala() {
  return which.sync("nala", { nothrow: true }) !== null
}

/**
 * Get the apt command to use
 * If nala is installed, use that, otherwise use apt-get
 */
export function getApt() {
  let apt: string
  if (hasNala()) {
    apt = "nala"
  } else {
    apt = "apt-get"
  }
  return apt
}
