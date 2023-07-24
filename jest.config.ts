import type { Config } from "jest"

const jestConfig: Config = {
  testMatch: ["**/*.test.ts"],
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx", ".js", ".jsx"],
  transformIgnorePatterns: [], // transform node_modules
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  // coverage
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
  coveragePathIgnorePatterns: ["assets", ".css.d.ts"],
  verbose: true,
  detectOpenHandles: true,
}

export default jestConfig