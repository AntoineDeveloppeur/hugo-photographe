import resizePhoto, {
  calculateResizeDimensions,
} from "@/backend/utils/resizePhoto"
import "@testing-library/jest-dom"

describe("calculateResizeDimensions", () => {
  it("should return something", () => {
    expect(calculateResizeDimensions(1, 1).not().toBeUndefined())
  })
})
