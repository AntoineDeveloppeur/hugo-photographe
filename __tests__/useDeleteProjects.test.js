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

  it("should push to connexion page because no token", async () => {
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
  it("should push to connexion page because token is not correct", async () => {
    // Arrange
    const wrongToken = "fdsq"
    window.alert = jest.fn()
    window.localStorage.getItem = jest.fn().mockReturnValue(wrongToken)
    global.fetch.mockResolvedValue(() => ({
      status: "403",
      json: jest.fn(),
    }))
    // Act
    const { result } = renderHook(() => useDeleteProject())
    await act(async () => {
      result.current.deleteProject(id)
    })
    // Assert
    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith("/connexion")
  })
})
