module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    "globals": {
        "DEBUG": true
    },
    "transform": {
        "^.+\\.[jt]sx?$": "ts-jest"
    },
    "collectCoverageFrom": [
        "src/**/*.tsx"
    ],
    "coveragePathIgnorePatterns": [
        "/__tests__/",
        "/node_modules/"
    ],
    "testRegex": "__tests__/.*\\.test\\.tsx$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json",
        'node'
    ],
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.ts"
    }
};
