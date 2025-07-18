import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Contact from "@/components/ui/organisms/Contact/Contact"
import React from "react"
//Mock
jest.mock("@/public/images/portrait-Hugo.webp", () => ({
  src: "/src/of/the/pic",
}))

// How to mock useContext :
//  const { showPresentation, setShowPresentation } = useContext(
//     ShowPresentationContext
//   )

// jest.mock("framer-motion", () => ({
//   // useScroll: jest.fn(() => ({ scrollYprogress: "123" })),
//   useScroll: jest.fn(() => ({ scrollYProgress: "123" })),
//   useTransform: jest.fn(),
//   useSpring: jest.fn(),
// }))

// Pourquoi je n'ai pas besoin de mock framer-motion ?

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
