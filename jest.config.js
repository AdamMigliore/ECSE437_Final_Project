module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: "ts-jest",
  setupFilesAfterEnv: ["./test/prismaMock.ts"],
};
