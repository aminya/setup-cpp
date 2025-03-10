// from https://www.npmjs.com/package/randomuuid-polyfill

import { performance } from "perf_hooks"

// Adapted from https://stackoverflow.com/a/8809472/2993077
if (!global.crypto?.randomUUID) {
  if (!global.crypto) {
    global.crypto = {}
  }

  global.crypto.randomUUID = () => {
    let date = new Date().getTime()
    let performanceNow = performance.now() * 1000

    // cspell:disable-next-line
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
      let random = Math.random() * 16
      if (date > 0) {
        random = (date + random) % 16 | 0
        date = Math.floor(date / 16)
      } else {
        random = (performanceNow + random) % 16 | 0
        performanceNow = Math.floor(performanceNow / 16)
      }
      return (char === "x" ? random : (random & 0x3 | 0x8)).toString(16)
    })
  }
}

const randomUUID = global.crypto.randomUUID.bind(global.crypto)
export { randomUUID }
