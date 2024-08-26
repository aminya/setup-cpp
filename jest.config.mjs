/**
 * @type {import('jest').Config}
 */
const jestConfig = {
  testMatch: ["**/*.test.ts"],
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
  transformIgnorePatterns: [], // transform node_modules
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  // resolve js files from ts files
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
  // coverage
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
  coveragePathIgnorePatterns: ["assets", ".css.d.ts"],
  verbose: true,
}

export default jestConfig
