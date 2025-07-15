import "@testing-library/jest-dom"

// Simuler fetch
global.fetch = jest.fn()
process.env.NEXT_PUBLIC_SERVER_URL = "https://test.com"

// Simuler le router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

const Router = {
  push: jest.fn()
}


const id = 'testid'


describe(('useDeleteProject',() => {
  it('should push to connexion page')
}))
window.localStorage.getItem("token") = jest.fn(() => undefined)