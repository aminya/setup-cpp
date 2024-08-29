/**
 * The timeout to use for apt commands
 * Wait up to 300 seconds if the apt-get lock is held
 * @private Used internally
 */

export const aptTimeout = "Dpkg::Lock::Timeout=300"
