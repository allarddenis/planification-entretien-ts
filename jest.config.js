const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: [ '<rootDir>' ],
    modulePaths: [ compilerOptions.baseUrl ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    transform: { '^.+\\.(t|j)sx?$': [ 'ts-jest', { isolatedModules: true }] },
    testPathIgnorePatterns: [
        '/node_modules/',
        '/build/'
    ]
};