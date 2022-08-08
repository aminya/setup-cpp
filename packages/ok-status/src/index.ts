import * as https from "https"

/**
 * Check if the GET request for the given URL works
 *
 * @param url The given URL
 * @returns A promise that resolves to a boolean indicating if the URL works
 */
export function getWorks(url: string): Promise<boolean> {
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
