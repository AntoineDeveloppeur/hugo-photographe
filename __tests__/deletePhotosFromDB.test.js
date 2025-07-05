jest.mock("../backend/utils/getS3Client.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock(
  "@aws-sdk/client-s3",
  () => {
    return {
      DeleteObjectCommand: jest.fn().mockImplementation((params) => {
        return { params }
      }),
    }
  },
  { virtual: true }
) // L'option virtual: true permet de mocker un module qui n'est pas installé

import deletePhotos, {
  deleteOnePhotoFromDB,
} from "@/backend/utils/deletePhotos"

const mockProject = {
  mainPhoto: {
    src: "url",
  },
  photosSets: [[{ src: "url" }]],
}

describe("deleteOnePhoto", () => {})

describe("deletePhotosFromDB", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it("should return true", () => {
    // Je veux que les prochains appels à la fonction deleteOnePhoto retourne true
    // mockReturnValue
    const mockDelete = jest.fn().mockResolvedValue(true)

    expect(deletePhotos(mockProject, mockDelete)).toBe(true)
  })
})
