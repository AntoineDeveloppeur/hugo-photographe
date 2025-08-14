export const metadata = { width: 3000, height: 1500 }

// Mock de sharp pour les tests
const sharp = jest.fn(() => ({
  resize: jest.fn().mockReturnThis(),
  toFile: jest.fn().mockResolvedValue(undefined),
  metadata: jest.fn().mockReturnValue(metadata),
  webp: jest.fn().mockReturnThis(),
}))

export default sharp
