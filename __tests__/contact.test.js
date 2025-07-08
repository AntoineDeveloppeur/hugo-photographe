// Je veux vérifier que si le recaptcha fonctionne un numéro de téléphone est affiché
import { renderHook, waitFor } from "@testing-library/react"
import useReCaptcha from "../hooks/useReCaptcha"
//importer pour render du React
//importer pour utiliser useEffect

// mocker executeRecaptcha
jest.mock("react-google-recaptcha-v3", () => ({
  useGoogleReCaptcha: () => ({
    executeRecaptcha: jest.fn().mockResolvedValue(undefined),
  }),
}))

global.fetch = jest.fn()
process.env.NEXT_PUBLIC_SERVER_URL = "https://test.com"

describe("useReCaptcha", () => {
  beforeEach(() => jest.clearAllMocks())
  it("should return undefined if executeRecaptcha is falsy", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ success: false, name: "", email: "", phone: "" }),
    })

    // let result
    // await act(async () => {
    //   result = renderHook(useReCaptcha).result
    // })

    const { result } = renderHook(useReCaptcha)
    await waitFor(() => {
      expect(result.current.success).toBe(false)
    })
  })
})
