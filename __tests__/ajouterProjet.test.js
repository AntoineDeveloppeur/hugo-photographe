import { screen, render, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import AjouterProjet from "@/app/ajouterProjet/page"

// Mock de la fonction postForm qui utilise des APIs serveur
jest.mock("@/utils/postForm", () => ({
  // Autre manière d'appeler postForm : remplacer par default car c'est l'import par défaut. la propriété esModule permet de s'assurer que Jest comprends la différence
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    success: true,
    redirectPath: "/succesAjoutProjet",
  }),
}))

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe("ajouterProjet", () => {
  it("should render", () => {
    act(() => render(<AjouterProjet />))

    const header = screen.getByRole("heading", { level: 1 })

    expect(header).toBeInTheDocument()
  })
})
