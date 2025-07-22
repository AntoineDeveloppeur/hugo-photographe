import {
  calculateResizeDimensions,
  resizePhoto,
} from "@/backend/utils/resizePhoto"

// mock uuidv4
const mockUuidValue = "abc123"
jest.mock("uuid", () => ({
  v4: jest.fn(() => mockUuidValue),
}))

// mock sharp
jest.mock("sharp", () => {
  const mockSharp = () => ({
    resize: () => ({
      toFile: jest.fn().mockResolvedValue(undefined),
    }),
  })
  return { default: mockSharp }
})

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
    const metadata = {
      width: 3840,
      height: 2160,
      format: "webp",
    }
    const result = await resizePhoto(metadata, file)
    expect(result).toEqual({
      ...file,
      width: metadata.width,
      height: metadata.height,
    })
  })
  it("should return a specific file path with metadata.format available", async () => {
    const metadata = {
      width: 2000,
      height: 1500,
      format: "webp",
    }
    const result = await resizePhoto(metadata, file)
    expect(result.filepath).toBe(`local/testimage${mockUuidValue}.png`)
  })
})
