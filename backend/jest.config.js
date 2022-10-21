/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@exmpl/(.*)': '<rootDir>/routes/$1',
        emitDecoratorMetadata: true
    },
};