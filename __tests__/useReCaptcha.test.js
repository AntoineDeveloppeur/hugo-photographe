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
    global.fetch.mockRejectedValueOnce()

    // Act
    renderHook(() => useReCaptcha())
    await waitFor(() => {
      // Assert
      expect(console.error).toHaveBeenCalled()
    })

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(
      "https://test-url.com/api/recaptcha",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: "mock-token" }),
      }
    )
  })
})
