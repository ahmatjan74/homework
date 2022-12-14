export default {

    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
    coverageReporters: ["json", "text", "lcov", "clover"],
    moduleFileExtensions: [
        "js",
        // "mjs",
        // "cjs",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node",
    ],
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    testPathIgnorePatterns: ["\\\\node_modules\\\\"],
    moduleDirectories: ["node_modules", "src"],
    modulePaths: ["<rootDir>/src"],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
};