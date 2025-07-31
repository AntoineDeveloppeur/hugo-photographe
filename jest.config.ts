import type { Config } from "jest"
import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  // Le chemin vers votre application Next.js
  dir: "./",
})

// Configuration Jest personnalisée
const customJestConfig: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  // Spécifier explicitement les fichiers de test
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // Configuration pour résoudre les modules depuis plusieurs répertoires
  moduleDirectories: [
    "node_modules",
    "<rootDir>/node_modules",
    "<rootDir>/backend/node_modules",
  ],

  collectCoverageFrom: [
    // "**/*.{js,jsx,ts,tsx}",
    // "!**/*.d.ts",
    // "!**/node_modules/**",
    // "!<rootDir>/out/**",
    // "!<rootDir>/.next/**",
    // "!<rootDir>/*.config.js",
    // "!<rootDir>/*.config.ts",
    // "!<rootDir>/coverage/**",
    // "!<rootDir>/jest.setup.js",
  ],
  clearMocks: true,
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "/^.+\\.module\\.(css|sass|scss)$/": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$": `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    "^@/(.*)$": "<rootDir>/$1",

    // Handle @next/font
    "@next/font/(.*)": `<rootDir>/__mocks__/nextFontMock.js`,
    // Handle next/font
    "next/font/(.*)": `<rootDir>/__mocks__/nextFontMock.js`,
    // Disable server-only
    "server-only": `<rootDir>/__mocks__/empty.js`,
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
}

// createJestConfig est exporté de cette façon pour s'assurer que next/jest peut charger la configuration Next.js
export default createJestConfig(customJestConfig)
