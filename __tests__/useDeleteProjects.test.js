import "@testing-library/jest-dom"
import useDeleteProject from "../hooks/useDeleteProject"
import { renderHook, act } from "@testing-library/react"

// Simuler fetch
global.fetch = jest.fn()
process.env.NEXT_PUBLIC_SERVER_URL = "https://test.com"

// Simuler le router
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

const id = "testid"

describe("useDeleteProject", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should push to connexion page", async () => {
    // Arrange
    window.alert = jest.fn()
    window.localStorage.getItem = jest.fn().mockReturnValue(null)

    // Act
    const { result } = renderHook(() => useDeleteProject())
    await act(async () => {
      result.current.deleteProject(id)
    })

    // Assert
    expect(mockPush).toHaveBeenCalledWith("/connexion")
    expect(window.alert).toHaveBeenCalledTimes(1)
  })
})
