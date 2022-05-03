module.exports = {
  preset: "ts-jest/presets/js-with-ts-esm",
  extensionsToTreatAsEsm: [".ts"],
  transformIgnorePatterns: [], // transform everything
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: ["<rootDir>/src/python/setup-python/"],
  // coverage
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["assets", ".css.d.ts"],
  verbose: true,
}
