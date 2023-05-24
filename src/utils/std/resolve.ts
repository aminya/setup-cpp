import resolveCb from "resolve"

interface PackageMeta {
  name: string
  version: string
  [key: string]: any
}

/** Promise wrapper for resolve */
export async function resolve(id: string): Promise<{ resolved: string; pkg?: PackageMeta }> {
  return new Promise((resolve, reject) => {
    resolveCb(id, (err, resolved, pkg) => {
      if (err) {
        reject(err)
      } else if (resolved === undefined) {
        reject(new Error(`Could not resolve ${id}`))
      } else {
        resolve({ resolved, pkg })
      }
    })
  })
}

export async function isInstalled(id: string) {
    try {
        await resolve(id)
        return true
    } catch {
        return false
    }
}
