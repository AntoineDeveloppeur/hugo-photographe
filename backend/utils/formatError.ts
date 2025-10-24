export default function formatError(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error)
  }
  return String(error)
}
