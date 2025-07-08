import { renderHook, waitFor } from "@testing-library/react"
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
  it("should return success: false if executeRecaptcha is undefined", async () => {
    // Arrange
    jest.mock("react-google-recaptcha-v3", () => ({
      useGoogleReCaptcha: () => ({
        executeRecaptcha: jest.fn().mockResolvedValueOnce(undefined),
      }),
    }))

    // Act
    const { result } = renderHook(useReCaptcha)

    // Assert
    await waitFor(() => {
      expect(result.current.success).toBe(false)
    })
  })
  it("should return success: false if fetch is rejected", async () => {
    // Arrange
    global.fetch.mockRejectedValueOnce()
    jest.mock("react-google-recaptcha-v3", () => ({
      useGoogleReCaptcha: () => ({
        executeRecaptcha: jest.fn().mockResolvedValue("mock-token"),
      }),
    }))

    // Act
    renderHook(() => useReCaptcha())

    // Assert
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled()
    })
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
  it("should return valid email, phone and name if fetch succeed", async () => {
    // Arrange
    jest.mock("react-google-recaptcha-v3", () => ({
      useGoogleReCaptcha: () => ({
        executeRecaptcha: jest.fn().mockResolvedValue("mock-token"),
      }),
    }))
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: true,
        name: "h",
        email: "fdsq@fdsq.com",
        phone: "06 00 00 00 00",
      }),
    })

    // Act
    const { result } = renderHook(() => useReCaptcha())

    // Assert
    await waitFor(() => {
      expect(result.current.success).toBe(true)
      expect(typeof result.current.name).toBe("string")
      expect(result.current.email).toMatch(/@/)
      expect(result.current.phone).toMatch(/^\d{2}(\s\d{2}){4}$/)
    })
  })
})
