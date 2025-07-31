// jest.setup.js
import "@testing-library/jest-dom"

// Polyfills pour les APIs Web modernes manquantes dans l'environnement Jest
import { TextEncoder, TextDecoder } from "util"

// Définir TextEncoder et TextDecoder globalement
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
