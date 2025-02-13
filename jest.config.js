/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */

module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    verbose: true,
};
