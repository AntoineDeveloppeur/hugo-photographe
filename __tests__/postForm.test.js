import postForm from "@/utils/postForm.ts"
import { revalidatePath } from "next/cache"

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}))

global.fetch = jest.fn()

const mockForm = {}
const mockToken = "azerty"
describe("postForm", () => {
  it("should redirect to connexion if token is null", async () => {
    expect(await postForm(mockForm, null)).toEqual({
      success: false,
      error: "Veuillez vous connecter pour enregistrer un projet",
      redirectPath: "/connexion",
    })
  })
  it("should redirect to connexion if response.status = 403", async () => {
    global.fetch.mockResolvedValue({ status: 403 })
    expect(await postForm(mockForm, mockToken)).toEqual({
      success: false,
      error: "Veuillez vous connecter pour enregistrer un projet",
      redirectPath: "/connexion",
    })
  })
  it("should redirect to connexion if response.status = 403", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: "il y eu une erreur" }),
    })
    expect(await postForm(mockForm, mockToken)).toEqual({
      success: false,
      error: "il y eu une erreur",
    })
  })
  it("should return success = true", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn(),
    })
    expect(await postForm(mockForm, mockToken)).toEqual({
      success: true,
      redirectPath: "/succesAjoutProjet",
    })
    expect(revalidatePath).toHaveBeenCalledWith("/projectPage")
  })

  it("should swallow an exception", async () => {
    global.fetch.mockImplementation(() => {
      throw new Error()
    })
    expect(await postForm(mockForm, mockToken)).toEqual({
      success: false,
      error:
        "L'enregistrement a échoué, vérifier votre connexion internet puis contacter votre administrateur",
      redirectPath: "/administrateur",
    })
    expect(revalidatePath).not.toHaveBeenCalled()
  })
})
