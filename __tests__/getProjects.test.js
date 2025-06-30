import getProjects from "@/utils/getProjects"

// Je voudrais tester que la fonction getProjects me renvoi un objet contenant la clé projects

describe("getProjects", () => {
  it("should return something", async () => {
    await expect(getProjects()).resolves.toBeDefined()
    await expect(getProjects()).rejects.toBeDefined()
  })
  it("should return an object which contain 'projects'", async () => {
    const data = await getProjects()
    expect(data.projects).toBeDefined()

    console.log("data", data)

    // await expect(getProjects()).resolves.toContain(/projects/)
  })
})
