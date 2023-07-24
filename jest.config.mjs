/** @typedef {import("jest")} jestConfig */
const jestConfig = {
  preset: "ts-jest/presets/js-with-ts-esm",
  extensionsToTreatAsEsm: [".ts"],
  transformIgnorePatterns: [], // transform everything
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: ["<rootDir>/src/python/setup-python/"],
  // tsconfig
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      /** @type {import("ts-jest")} */
      {
        importHelpers: true,
        useESM: true,
      },
    ],
  },
  // coverage
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["assets", ".css.d.ts"],
  verbose: true,
  detectOpenHandles: true,
}

export default jestConfig
