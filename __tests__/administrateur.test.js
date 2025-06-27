import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Administrateur from "@/app/administrateur/page"

beforeEach(() => {
  render(<Administrateur />)
})
describe("Administrateur", () => {
  it("renders a heading", () => {
    const heading = screen.getByRole("heading", { level: 1 })

    expect(heading).toBeInTheDocument()
  })
  it("show Ajouter un Projet", () => {
    // render(<Administrateur />)

    const text = screen.getByText(/ajouter un projet/i)
    expect(text).toBeInTheDocument()
  })
})
