import which from "which"

/**
 * Check if nala is installed
 */
export function hasNala() {
  return which.sync("nala", { nothrow: true }) !== null
}

/**
 * Check if apt-fast is installed
 */
export function hasAptFast() {
  return which.sync("apt-fast", { nothrow: true }) !== null
}

/**
 * Check if apt is installed
 */
export function hasApt() {
  return which.sync("apt", { nothrow: true }) !== null
}

/**
 * Check if apt-get is installed
 */
export function hasAptGet() {
  return which.sync("apt-get", { nothrow: true }) !== null
}

/**
 * Get the apt command to use
 * If nala is installed, use that, otherwise use apt-get
 */
export function getApt() {
  if (hasNala()) {
    return "nala"
  } else if (hasAptFast()) {
    return "apt-fast"
    // } else if (hasApt()) {
    //   return "apt"
  } else if (hasAptGet()) {
    return "apt-get"
  } else {
    throw new Error("No apt command found")
  }
}
