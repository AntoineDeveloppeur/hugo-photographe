import uploadPhoto from "@/backend/utils/uploadPhoto"

jest.mock("@aws-sdk/client-s3", () => ({
  PutObjectCommand: class Anonymous {
    constructor(arg) {
      this.arg = "noNeed"
    }
  },
}))

// Mock getS3Client as a function that returns an object with a send method
jest.mock("@/backend/utils/getS3Client", () => () => ({
  send: jest.fn().mockResolvedValue({}),
}))
// Mock fs with a readFileSync that returns a Buffer
jest.mock("fs", () => ({ readFileSync: jest.fn(() => Buffer.from("mock")) }))
const file = {
  filepath: "mockFilepath",
  originalFilename: "mockOriginalFilename",
  mimetype: "mockMimetype",
}
const prefix = "mockBucketName"
jest.spyOn(Date, "now").mockReturnValue(123)
const key = `${prefix ? prefix + "/" : ""}${Date.now()}-${
  file.originalFilename
}`
process.env.AWS_S3_BUCKET_NAME = prefix
process.env.AWS_REGION = "mockRegion"

describe("uploadPhoto", () => {
  it("should return the correct url", async () => {
    //Arrange
    const expectedUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    //Act & Assert
    await expect(uploadPhoto(file, prefix)).resolves.toBe(expectedUrl)
  })
})
