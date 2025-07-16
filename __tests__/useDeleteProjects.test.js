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

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString()
    }),
    clear: jest.fn(() => {
      store = {}
    }),
    removeItem: jest.fn((key) => {
      delete store[key]
    }),
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("useDeleteProject", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockClear()
  })

  it("should push to connexion page", async () => {
    // Arrange
    // Assurer que localStorage.getItem("token") retourne null
    localStorageMock.getItem.mockReturnValue(null)
    window.alert = jest.fn()

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
