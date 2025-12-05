module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/tests/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/fileMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"]
};