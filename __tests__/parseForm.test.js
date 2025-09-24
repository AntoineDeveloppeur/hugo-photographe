import { parseForm } from "@/backend/dist/middleware/upload"

jest.mock("sharp")

// Mocker partiel de formidable
const mockParse = jest.fn()
jest.mock("formidable", () => ({
  IncomingForm: class {
    constructor() {
      this.parse = mockParse // Toutes les instances partagent le même mock
    }
  },
}))

jest.mock("@/backend/dist/utils/resizePhoto.js", () => ({
  resizePhoto: jest.fn(async (metadata, file) => ({
    ...file,
    ...metadata,
  })),
}))

jest.mock("@/backend/dist/utils/convertToWebp.js", () => ({
  convertToWebp: jest.fn(async (file) => ({
    ...file,
    filepath: "/src.webp",
    originalFilename: "image.webp",
    mimetype: "image/webp",
  })),
}))

describe("parseForm", () => {
  it("should reject with an err", async () => {
    // Arrange
    // Mocker une requête avec une erreur
    const mockRequest = {
      body: {
        err: "il y a bien une erreur",
      },
    }

    // Mocker parse de formidable
    mockParse.mockImplementation((req, callback) => {
      callback(new Error("il y a bien une erreur"), null, null)
    })

    // Act & Assert
    await expect(parseForm(mockRequest)).rejects.toThrow(
      "il y a bien une erreur"
    )
  })
})
