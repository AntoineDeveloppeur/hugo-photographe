import { render, screen } from "@testing-library/react"
import imageURL from "@/utils/imageURL"
import getProjects from "@/utils/getProjects"
import { widthAcceptedByNextJs } from "@/utils/imageURL"

describe("Get the url of the image to preload the modal test unit", () => {
  it("should return something", () => {
    expect(widthAcceptedByNextJs(1920, 3)).toBeDefined()
  })
  it("should return 1920", () => {
    expect(widthAcceptedByNextJs(640, 2)).toBe(1920)
  })
  it("should return maximum 3840", () => {
    expect(widthAcceptedByNextJs(5000, 5)).toBe(3840)
  })
  it("should return minimum 16", () => {
    expect(widthAcceptedByNextJs(1, 1)).toBe(16)
  })
  it("should return a certain type of url", () => {
    expect(imageURL(20, 100, "https://sourcecom", 2)).toMatch(
      /_next\/image\?url=%2F/
    )
  })
  // Faire un test avec la variable d'environement disponible et vérifié qu'il y a http dans dans l'url
})
