// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    "**/tests/**/*.[jt]s?(x)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
  ]
};