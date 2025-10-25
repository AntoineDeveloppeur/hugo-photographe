import sharp from "sharp"
import { convertToWebp } from "@/backend/dist/utils/convertToWebp.js"
import { resizePhoto } from "@/backend/dist/utils/resizePhoto.js"
import processPhotos from "@/backend/dist/utils/processPhotos.js"

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

const mockWidth = 3000
const mockHeight = 1500
const mockFormat = "webp"

jest.mock("@/backend/dist/utils/resizePhoto.js", () => ({
  resizePhoto: jest.fn(async (mockWidth, mockHeight, mockFormat, file) => ({
    ...file,
    height: mockHeight,
    width: mockWidth,
  })),
}))

jest.mock("@/backend/dist/utils/convertToWebp.js", () => ({
  convertToWebp: jest.fn(async (file) => ({
    ...file,
    filepath: "/image.webp",
    originalFilename: "image.webp",
    mimetype: "image/webp",
  })),
}))

describe("processPhotos", () => {
  it("should throw an error if the mimetype is not image/", async () => {
    // Arrange
    // Mock files avec un mimetype "script/png"
    const files = {
      set1photo1: [
        {
          filepath: "/image.png",
          originalFilename: "image.webp",
          mimetype: "script/png",
        },
      ],
    }

    // Act & Assert
    await expect(processPhotos(files)).rejects.toThrow(
      "La photo choisie n'est pas une image"
    )
    expect(convertToWebp).toHaveBeenCalledTimes(0)
  })
  it("should not call resizePhoto if metadata are not available", async () => {
    // Arrange
    // Mock files correct
    const files = {
      set1photo1: [
        {
          filepath: "/image.webp",
          originalFilename: "image.webp",
          mimetype: "image/webp",
        },
      ],
    }
    // Modifier le mock Sharp AVANT que le module soit utilisé
    sharp.mockImplementation(() => ({
      resize: jest.fn().mockReturnThis(),
      toFile: jest.fn().mockResolvedValue(undefined),
      metadata: jest.fn().mockReturnValue({
        width: undefined,
        height: undefined,
      }), // ← Votre modification
      webp: jest.fn().mockReturnThis(),
    }))

    const processedFilesArray = await Promise.all(
      Object.entries(files).map(async ([key, fileArray]) => {
        const file = fileArray[0]
        return { [key]: file }
      })
    )
    const mockProcessedFiles = processedFilesArray.reduce((acc, object) => {
      return { ...acc, ...object }
    })
    // Act
    const result = await processPhotos(files)
    //Assert
    expect(resizePhoto).toHaveBeenCalledTimes(0)
  })
  it("should call resizePhoto if metadata available", async () => {
    // Arrange
    // Mock files correct
    const files = {
      set1photo1: [
        {
          filepath: "/image.webp",
          originalFilename: "image.webp",
          mimetype: "image/webp",
        },
      ],
    }
    // Je réécris la bonne implementation de sharp. Dans le test précédent j'ai changé l'implementation
    sharp.mockImplementation(() => ({
      resize: jest.fn().mockReturnThis(),
      toFile: jest.fn().mockResolvedValue(undefined),
      metadata: jest.fn().mockReturnValue({
        width: mockWidth,
        height: mockHeight,
        format: mockFormat,
      }), // ← Votre modification
      webp: jest.fn().mockReturnThis(),
    }))
    // Act
    await processPhotos(files)

    //Assert
    expect(resizePhoto).toHaveBeenCalledTimes(1)
  })
  it("should return the same object + originalFilename changed with uuid if mimetype is image/webp", async () => {
    // Arrange
    // Mock files correct au format webp
    const files = {
      set1photo1: [
        {
          filepath: "/image.webp",
          originalFilename: "image.webp",
          mimetype: "image/webp",
          height: mockHeight,
          width: mockWidth,
        },
      ],
    }

    // transform le format de files pour qu'il corresponde à la valeur de sortie
    const processedFilesArray = await Promise.all(
      Object.entries(files).map(async ([key, fileArray]) => {
        const file = fileArray[0]
        // Ajoute les metadata
        return { [key]: { ...file, width: mockWidth, height: mockHeight } }
      })
    )
    const mockProcessedFiles = processedFilesArray.reduce((acc, object) => {
      return { ...acc, ...object }
    })
    // Act
    const result = await processPhotos(files)
    //Assert
    expect(result).toEqual(mockProcessedFiles)
  })
  it("should use convertToWeb if mimetype is not image/webp", async () => {
    // Arrange
    // Mock files au format webp
    const files = {
      set1photo1: [
        {
          filepath: "/image.jpg",
          originalFilename: "image.jpg",
          mimetype: "image/jpg",
        },
      ],
    }

    // Act
    await processPhotos(files)

    //Assert
    expect(convertToWebp).toHaveBeenCalledTimes(1)
  })
})
