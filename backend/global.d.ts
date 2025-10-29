// Déclaration pour ignorer les imports backend dans le type-check du frontend
declare module "@/backend/*" {
  const content: any
  export default content
}
