import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import AjouterProjet from "@/app/ajouterProjet/page"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe("ajouterProjet", () => {
  it("should render", () => {
    render(<AjouterProjet />)

    const header = screen.getByRole("heading", { level: 1 })

    expect(header).toBeInTheDocument()
  })
})
