import { getSpecificVersionAndUrl } from "../llvm"
import * as https from "https"

jest.setTimeout(100000)

function testUrl(version: string) {
  const [specificVersion, url] = getSpecificVersionAndUrl(process.platform, version)

  const input = `Version: ${version} => ${specificVersion} \n URL: ${url}`

  return new Promise<string>((resolve, reject) => {
    https.get(url, (res) => {
      const report = `${input}\nStatus: ${res.statusCode}\nContent-Length: ${res.headers["content-length"]}`
      if (res.statusCode !== undefined && res.statusCode >= 200 && res.statusCode <= 399) {
        resolve(report)
      } else {
        reject(new Error(`Failed to download LLVM and Clang binaries.\n${input}\n${report}`))
      }
    })
  })
}

describe("setup-llvm", () => {
  it("Finds valid LLVM URLs", async () => {
    await Promise.all(
      ["12.0.0", "12", "11", "11.0.0", "10", "10.0.0", "9.0.0", "8.0.0", "7.0.0", "6", "6.0.0", "5", "5.0.0", "4"].map(
        (version) => testUrl(version)
      )
    )
  })
})
