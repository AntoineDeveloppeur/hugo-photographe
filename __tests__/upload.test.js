import { parseForm, processFiles } from "@/backend/dist/middleware/upload"
import sharp from "@/__mocks__/sharp"

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

const metadata = { width: 3000, height: 1500 }

//Mocker resizePhoto
const resizePhoto = jest.fn(async (metadata, file) => ({
  ...file,
  ...metadata,
}))

// Mocker convertToWebp
const convertToWebp = jest.fn(async (file) => ({
  ...file,
  filepath: "/src.webp",
  originalFilename: "image.webp",
  mimetype: "image/webp",
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

describe("processFiles", () => {
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
    await expect(processFiles(files)).rejects.toThrow(
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
          filepath: "/image.png",
          originalFilename: "image.webp",
          mimetype: "image/webp",
        },
      ],
    }
    // Modifier le mock Sharp AVANT que le module soit utilisé
    sharp.mockImplementation(() => ({
      resize: jest.fn().mockReturnThis(),
      toFile: jest.fn().mockResolvedValue(undefined),
      metadata: jest.fn().mockReturnValue(null), // ← Votre modification
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
    const result = await processFiles(files)
    //Assert
    expect(resizePhoto).toHaveBeenCalledTimes(0)
  })
  it("should return the same object + originalFilename if mimetype is image/webp", async () => {
    // Arrange
    // Mock files correct au format png
    const files = {
      set1photo1: [
        {
          filepath: "/image.webp",
          originalFilename: "image.webp",
          mimetype: "image/webp",
        },
      ],
    }

    // transform le format de files pour qu'il corresponde à la valeur de sortie
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
    const result = await processFiles(files)
    //Assert
    expect(result).toEqual(mockProcessedFiles)
  })
  it("should return the same object + originalFilename if mimetype is not image/webp", async () => {
    // Arrange
    // Mocker une requête avec tous disponible et mimetype image/webp
    // Mocker sharp pour qu'il renvoie les metadata
    // Act
    const result = await parseForm(mockRequest)
    //Assert
    expect(convertToWebp).toHaveBeenCalledTimes(1)
    expect(result.files).toEqual(req.files)
  })
  it("should catch a conversion error", async () => {
    // Arrange
    // Mocker une requête avec tous disponible
    // Mocker processedFilesArray pour qu'il contient une promesse rejetée

    // Act
    const result = await parseForm(mockRequest)
    //Assert
    // expect error
  })
})
