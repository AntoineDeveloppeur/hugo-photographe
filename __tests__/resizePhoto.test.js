import {
  calculateResizeDimensions,
  resizePhoto,
} from "@/backend/dist/utils/resizePhoto"

// Auto-mocking des modules suivants
import sharp from "sharp"
import { mockUuidValue } from "uuid"

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
    const mockWidth = 3840
    const mockHeight = 2160
    const mockFormat = "webp"

    // Act
    const result = await resizePhoto(mockWidth, mockHeight, mockFormat, file)

    // Assert
    expect(result).toEqual({
      ...file,
      width: mockWidth,
      height: mockHeight,
    })
  })
  it("should return a specific file path with metadata.format available", async () => {
    // Arrange
    const mockWidth = 4000
    const mockHeight = 6000
    const mockFormat = "webp"

    // Act
    const result = await resizePhoto(mockWidth, mockHeight, mockFormat, file)

    // Assert
    expect(sharp).toHaveBeenCalledTimes(1)
    expect(result.filepath).toBe(`local/${mockUuidValue}.webp`)
  })
  it("with and height of returned object should be the same is result from calculateResizeDimensions fonction", async () => {
    // Arrange

    const mockWidth1 = 4000
    const mockHeight1 = 6000
    const mockFormat1 = "webp"

    const mockWidth2 = 4000
    const mockHeight2 = 6000
    const mockFormat2 = "webp"
    // Act
    const result1 = await resizePhoto(
      mockWidth1,
      mockHeight1,
      mockFormat1,
      file
    )
    const result2 = await resizePhoto(
      mockWidth2,
      mockHeight2,
      mockFormat2,
      file
    )

    // Assert
    expect(sharp).toHaveBeenCalledTimes(2)
    expect(result1.width).toBe(
      calculateResizeDimensions(mockWidth1, mockHeight1).width
    )
    expect(result1.height).toBe(
      calculateResizeDimensions(mockWidth1, mockHeight1).height
    )
    expect(result2.width).toBe(
      calculateResizeDimensions(mockWidth2, mockHeight2).width
    )
    expect(result2.height).toBe(
      calculateResizeDimensions(mockWidth2, mockHeight2).height
    )
  })
})
