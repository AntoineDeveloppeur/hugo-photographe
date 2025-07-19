import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Contact from "@/components/ui/organisms/Contact/Contact"
import React from "react"

// Mock spécifique pour useContext sans casser React
jest.spyOn(React, "useContext").mockReturnValue({
  showPresentation: true,
  setShowPresentation: jest.fn(),
})

const mockEmail = "test@gmail.com"
const mockPhone = "06 65 56 65 56"
jest.mock("@/hooks/useReCaptcha", () =>
  jest.fn(() => ({
    email: mockEmail,
    phone: mockPhone,
  }))
)

beforeEach(() => render(<Contact />))
describe("Contact section", () => {
  it("should show mobile number with spaces between number", () => {
    expect(screen.getByText(mockPhone)).toBeInTheDocument()
  })
})
