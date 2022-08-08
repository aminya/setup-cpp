import * as https from "https"

export function isValidUrl(url: string) {
  return new Promise<boolean>((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode <= 399) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
