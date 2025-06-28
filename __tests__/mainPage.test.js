import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { userEvent } from "@testing-library/user-event"
import PhotoGallery from "@/components/ui/atoms/PhotoGallery/PhotoGallery"

// beforeEach(() => render(<PhotoGallery />))

describe("Main Page", () => {
  it("should show ", () => {
    const photo = {
      src: "/images/taiwan7.webp",
      alt: "paysage avec une personne de dos au loin",
      width: 3702,
      height: 2468,
      priority: true,
    }
    // render(
    //   <PhotoGallery
    //     photo={photo}
    //     priority={true}
    //   />
    // )
    const { container } = render(
      <PhotoGallery
        photo={photo}
        priority={true}
      />
    )

    screen.debug()
    // expect(screen.getByClassName(/imageWrapper/)).toBeInTheDocument()
    expect(container.querySelector(".imageWrapper")).toBeInTheDocument()
  })
})
