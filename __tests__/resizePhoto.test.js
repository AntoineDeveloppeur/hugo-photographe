import resizePhoto, {
  calculateResizeDimensions,
} from "@/backend/utils/resizePhoto"
import "@testing-library/jest-dom"

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
