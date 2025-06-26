// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Le chemin vers votre application Next.js
  dir: './',
})

// Configuration Jest personnalisée
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Gérer les alias de chemins si vous en utilisez dans votre projet
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
  },
}

// createJestConfig est exporté de cette façon pour s'assurer que next/jest peut charger la configuration Next.js
module.exports = createJestConfig(customJestConfig)
