// Mock de sharp pour les tests
const sharp = jest.fn(() => ({
  resize: jest.fn().mockReturnThis(),
  toFile: jest.fn().mockResolvedValue(undefined),
  metadata: jest.fn().mockReturnValue({ width: 3000, height: 1500 }),
}))

export default sharp
