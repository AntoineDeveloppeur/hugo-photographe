// mock sharp - utilise automatiquement __mocks__/sharp.js
jest.mock("sharp")

// mock uuidv4
const mockUuidValue = "abc123"
jest.mock("uuid", () => ({
  v4: jest.fn(() => mockUuidValue),
}))

import {
  calculateResizeDimensions,
  resizePhoto,
} from "@/backend/utils/resizePhoto"
import sharp from "sharp"

describe("calculateResizeDimensions", () => {
  it("should return something", () => {
    expect(calculateResizeDimensions(1, 1)).toBeDefined()
  })
  it("should return the same width and height", () => {
    expect(calculateResizeDimensions(3840, 2160)).toEqual({
      width: 3840,
      height: 2160,
    })
    expect(calculateResizeDimensions(3839, 2159)).toEqual({
      width: 3839,
      height: 2159,
    })
  })
  it("the width should be at maxWidth", () => {
    expect(calculateResizeDimensions(5000, 2300).width).toBe(3840)
  })
  it("the height should be at maxHeight", () => {
    expect(calculateResizeDimensions(5000, 4000).height).toBe(2160)
  })
})

describe("resizePhoto", () => {
  //mock file
  const file = {
    filepath: "local/testimage.png",
    mimetype: "image/png",
  }

  it("should return the same width and height", async () => {
    // Arrange
    const metadata = {
      width: 3840,
      height: 2160,
      format: "webp",
    }
    // Act
    const result = await resizePhoto(metadata, file)

    // Assert
    expect(result).toEqual({
      ...file,
      width: metadata.width,
      height: metadata.height,
    })
  })
  it("should return a specific file path with metadata.format available", async () => {
    // Arrange
    const metadata = {
      width: 4000,
      height: 6000,
      format: "webp",
    }

    // Act
    const result = await resizePhoto(metadata, file)

    // Assert
    expect(sharp).toHaveBeenCalledTimes(1)
    expect(result.filepath).toBe(`local\\${mockUuidValue}.webp`)
  })
})
