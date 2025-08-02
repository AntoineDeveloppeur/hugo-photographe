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

// Mocker file
const file = {
  set1photo1: {
    filepath: "/image.png",
    originalFilename: "image",
    mimetype: "image/png",
  },
}
// Mocker une requête avec une erreur
const mockRequest = {
  body: {
    err: "il y a bien une erreur",
    files: {
      file,
    },
    fields: {
      projectTexts: [
        '{"title":"test","summary":"test","alt":"test","textsAbovePhotos":["test"],"photosSets":[[{"alt":"test"}]]}',
      ],
    },
  },
}

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
    mockParse.mockImplementation((req, callback) => {
      callback(new Error("il y a bien une erreur"), null, null)
    })

    // Act & Assert
    await expect(parseForm(mockRequest)).rejects.toThrow(
      "il y a bien une erreur"
    )
  })
  it("should reject with 'formulaire vide'", async () => {
    // Arrange
    // Mocker une requête aucun field
    // Act
    const result = await parseForm(mockRequest)
    //Assert
    expect(convertToWebp).toHaveBeenCalledTimes(0)
    expect(result) // to reject with 'formulaire vide'
  })
  it("should reject with 'formulaire sans fichier", async () => {
    // Arrange
    // Mocker une requête aucun field
    // Act
    const result = await parseForm(mockRequest)
    //Assert
    expect(convertToWebp).toHaveBeenCalledTimes(0)
    expect(result) // to reject with 'formulaire sans fichier'
  })

  it("should return the same object if the mimetype is not image/", async () => {
    // Arrange
    // Mocker une requête avec un fichier qui n'est pas une image
    // Act
    const result = await parseForm(mockRequest)
    //Assert
    expect(convertToWebp).toHaveBeenCalledTimes(0)
    expect(result.files).toEqual(req.files)
  })
  it("should return the same object if metadata are not available", async () => {
    // Arrange
    // Mocker une requête avec tous disponible
    // Mocker sharp pour qu'il ne renvoie pas de metadata
    // Act
    const result = await parseForm(mockRequest)
    //Assert
    expect(convertToWebp).toHaveBeenCalledTimes(0)
    expect(result.files).toEqual(req.files)
  })
  it("should return the same object + originalFilename if mimetype is image/webp", async () => {
    // Arrange
    // Mocker une requête avec tous disponible et mimetype image/webp
    // Mocker sharp pour qu'il renvoie les metadata
    // Act
    const result = await parseForm(mockRequest)
    //Assert
    expect(convertToWebp).toHaveBeenCalledTimes(0)
    expect(result.files).toEqual(req.files)
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
