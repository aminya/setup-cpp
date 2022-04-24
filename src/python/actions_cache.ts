import { isCacheFeatureAvailable } from "setup-python/src/utils"
import { getCacheDistributor } from "setup-python/src/cache-distributions/cache-factory"

export async function cacheDependencies(cache: string, pythonVersion: string) {
  if (isCacheFeatureAvailable()) {
    const cacheDependencyPath = undefined // core.getInput("cache-dependency-path") || undefined
    const cacheDistributor = getCacheDistributor(cache, pythonVersion, cacheDependencyPath)
    await cacheDistributor.restoreCache()
  }
}
