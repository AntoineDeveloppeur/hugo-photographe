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

// le mockReturnValue est nécessaire par éviter une erreur dans l'exécution du test pourquoi ?
jest.spyOn(window, "alert").mockImplementation(() => {})

const id = "testid"

describe("useDeleteProject", () => {
  it("should push to connexion page because no token", async () => {
    // Arrange
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null)

    // Act
    const { result } = renderHook(() => useDeleteProject())
    await act(async () => {
      const success = await result.current.deleteProject(id)
      // Assert
      expect(success).toBe(false)
    })

    // Assert
    expect(mockPush).toHaveBeenCalledWith("/connexion")
    expect(window.alert).toHaveBeenCalledTimes(1)
  })
  it("should push to connexion page because token is not correct", async () => {
    // Arrange
    const wrongToken = "fdsq"
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(wrongToken)

    global.fetch.mockResolvedValue({
      status: 401,
      json: () => ({ message: "Mauvaise Nouvelle" }),
    })

    // Act
    const { result } = renderHook(() => useDeleteProject())
    await act(async () => {
      const success = await result.current.deleteProject(id)
      // Assert
      expect(success).toBe(false)
    })
    // Assert
    expect(window.alert).toHaveBeenCalledWith("Mauvaise Nouvelle")
    expect(mockPush).toHaveBeenCalledWith("/connexion")
  })
  it("should throw an error and not push when there is an http error", async () => {
    // Arrange
    const correctToken = "correctToken"
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(correctToken)
    global.fetch.mockResolvedValue({
      status: "402",
      json: jest.fn(() => ({ message: "Mauvaise Nouvelle" })),
      ok: false,
    })
    // Act
    const { result } = renderHook(() => useDeleteProject())
    await act(async () => {
      const success = await result.current.deleteProject(id)
      expect(success).toBe(false)
    })
    // Assert
    expect(window.alert).toHaveBeenCalledWith("Mauvaise Nouvelle")
    expect(mockPush).not.toHaveBeenCalled()
  })
  it("should return true", async () => {
    // Arrange
    const correctToken = "correctToken"
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(correctToken)
    global.fetch.mockResolvedValue({
      status: "200",
      json: jest.fn(() => ({ message: "Bonne Nouvelle" })),
      ok: true,
    })
    // Act
    const { result } = renderHook(() => useDeleteProject())
    await act(async () => {
      const success = await result.current.deleteProject(id)
      expect(success).toBe(true)
    })
    // Assert
    expect(window.alert).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
  })
})
