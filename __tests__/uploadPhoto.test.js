import uploadPhoto from "@/backend/dist/utils/uploadPhoto"

jest.mock("@aws-sdk/client-s3", () => ({
  PutObjectCommand: class Anonymous {
    constructor(arg) {
      this.arg = arg
    }
  },
}))

// Mock getS3Client as a function that returns an object with a send method
jest.mock("@/backend/dist/utils/getS3Client.js", () => () => ({
  send: jest.fn().mockResolvedValue({}),
}))
// Mock fs with a readFileSync that returns a Buffer
jest.mock("fs", () => ({ readFileSync: jest.fn(() => Buffer.from("mock")) }))
const file = {
  filepath: "mockFilepath",
  originalFilename: "mockOriginalFilename",
  mimetype: "mockMimetype",
}
jest.spyOn(Date, "now").mockReturnValue(123)
const key = `${Date.now()}-${file.originalFilename}`
process.env.AWS_S3_BUCKET_NAME = "mockBucketName"
process.env.AWS_REGION = "mockRegion"

describe("uploadPhoto", () => {
  it("should return the correct url", async () => {
    //Arrange
    const expectedUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    //Act & Assert
    await expect(uploadPhoto(file)).resolves.toBe(expectedUrl)
  })
})
