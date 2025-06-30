import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import PhotoGallery from "@/components/ui/atoms/PhotoGallery/PhotoGallery"

// Mock du hook useIsMobile
jest.mock("@/hooks/useIsMobile", () => {
  return jest.fn().mockReturnValue(false) // Simuler un appareil non-mobile
})

const photo = {
  src: "/images/taiwan7.webp",
  alt: "paysage avec une personne de dos au loin",
  width: 3702,
  height: 2468,
  priority: true,
}
beforeEach(() =>
  render(
    <PhotoGallery
      photo={photo}
      priority={true}
    />
  )
)

describe("PhotoGallery", () => {
  it("should show a photo ", () => {
    expect(screen.getByTestId("photoBasic")).toBeInTheDocument()
  })
  it("should open the modal", async () => {
    const user = userEvent.setup()
    await user.click(screen.getByTestId("PhotoGalleryImageWrapper"))
    expect(screen.queryByTestId("ModalPhotoGallery")).toBeInTheDocument()
  })
})
