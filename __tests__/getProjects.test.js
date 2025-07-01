import getProjects from "@/utils/getProjects"
import dataFallBack from "@/data/data"
// Je voudrais tester que la fonction getProjects me renvoi un objet contenant la clé projects

global.fetch = jest.fn()
describe("getProjects", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should return data when API responds succesfully", async () => {
    // Arrage
    const mockData = { projects: [{ title: "test", summary: "testTest" }] }
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    // Act
    const result = await getProjects()

    // Assert
    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it("should return dataFallBack when API reponse is not ok", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    })
    const result = await getProjects()
    expect(result).toEqual(dataFallBack)
  })
  // tester lorsque la requête renvoie une erreur
  it("should return dataFallBack when fetch throws an Error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network Error"))
    const result = await getProjects()
    expect(result).toEqual(dataFallBack)
  })
  it("should return an object which contain 'projects' which is an array", async () => {
    const mockData = { projects: [{ title: "test" }] }
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await getProjects()
    expect(Array.isArray(result.projects)).toBe(true)
  })
})
