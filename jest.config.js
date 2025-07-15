export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    moduleNameMapper: {
        "\\.(css|scss|sass)$": "identity-obj-proxy",
    },
};