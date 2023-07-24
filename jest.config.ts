import type { JestConfigWithTsJest } from "ts-jest"

const jestConfig: JestConfigWithTsJest = {
  testMatch: ["**/*.test.ts"],
  testEnvironment: "node",
  // transform configurations
  preset: "ts-jest/presets/js-with-ts-esm",
  extensionsToTreatAsEsm: [".ts"],
  transformIgnorePatterns: [], // transform node_modules
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
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
