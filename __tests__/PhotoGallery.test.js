import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { userEvent } from "@testing-library/user-event"
import PhotoGallery from "@/components/ui/atoms/PhotoGallery/PhotoGallery"

// beforeEach(() => render(<PhotoGallery />))

const photo = {
  src: "/images/taiwan7.webp",
  alt: "paysage avec une personne de dos au loin",
  width: 3702,
  height: 2468,
  priority: true,
}

describe("PhotoGallery", () => {
  it("should show a photo ", () => {
    const { container } = render(
      <PhotoGallery
        photo={photo}
        priority={true}
      />
    )
    expect(container.querySelector(".imageWrapper")).toBeInTheDocument()
  })
})
