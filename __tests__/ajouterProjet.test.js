import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import AjouterProjet from "@/app/ajouterProjet/page"

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
}))

describe("ajouterProjet", () => {
  it("should render", () => {
    render(<AjouterProjet />)

    const header = screen.getByRole("heading", { level: 1 })

    expect(header).toBeInTheDocument()
  })
})
