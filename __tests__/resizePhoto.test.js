import {
  calculateResizeDimensions,
  resizePhoto,
} from "@/backend/dist/utils/resizePhoto"

// Auto-mocking des modules suivants
import sharp from "sharp"
import { v4 as uuidv4, mockUuidValue } from "uuid"

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
  it("with and height of returned object should be the same is result from calculateResizeDimensions fonction", async () => {
    // Arrange
    const metadata1 = {
      width: 4000,
      height: 6000,
      format: "webp",
    }

    const metadata2 = {
      width: 6000,
      height: 2000,
      format: "webp",
    }
    // Act
    const result1 = await resizePhoto(metadata1, file)
    const result2 = await resizePhoto(metadata2, file)

    // Assert
    expect(sharp).toHaveBeenCalledTimes(2)
    expect(result1.width).toBe(
      calculateResizeDimensions(metadata1.width, metadata1.height).width
    )
    expect(result1.height).toBe(
      calculateResizeDimensions(metadata1.width, metadata1.height).height
    )
    expect(result2.width).toBe(
      calculateResizeDimensions(metadata2.width, metadata2.height).width
    )
    expect(result2.height).toBe(
      calculateResizeDimensions(metadata2.width, metadata2.height).height
    )
  })
})
