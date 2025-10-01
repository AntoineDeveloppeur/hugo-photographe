// Mock de sharp pour les tests
const sharp = jest.fn(() => ({
  resize: jest.fn().mockReturnThis(),
  toFile: jest.fn().mockResolvedValue(undefined),
}))

export default sharp
