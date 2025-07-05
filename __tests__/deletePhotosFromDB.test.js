import deletePhotosFromDB from "../backend/utils/deletePhotosFromDB"

const mockProject = {
  mainPhoto: {
    src: "url",
  },
  photosSets: [[{ src: "url" }]],
}

describe("deleteOnePhoto", () => {})

describe("deletePhotosFromDB", () => {
  it("should return true", () => {
    // Je veux que les prochains appels à la fonction deleteOnePhoto retourne true
    // mockReturnValue
    expect(deletePhotosFromDB(mockProject)).toBe(true)
  })
})
