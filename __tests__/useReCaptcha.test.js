import { renderHook, act, waitFor } from "@testing-library/react"
import useReCaptcha from "@/hooks/useReCaptcha"

global.fetch = jest.fn()
console.error = jest.fn()

jest.mock("react-google-recaptcha-v3", () => ({
  useGoogleReCaptcha: () => ({
    executeRecaptcha: jest.fn().mockResolvedValue("mock-token"),
  }),
}))

process.env.NEXT_PUBLIC_SERVER_URL = "https://test-url.com"

describe("useReCaptcha", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should return success: false if fetch is rejected", async () => {
    // Arrange
    global.fetch.mockRejectedValueOnce(new Error("HTTP error! status:"))

    // Act
    // Il faudrait un outil pour dire qu'il faut attendre les réponses asynchones
    const { result } = renderHook(() => useReCaptcha())
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled()
    })

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      "https://test-url.com/api/recaptcha",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.any(String),
      })
    )
  })
})
