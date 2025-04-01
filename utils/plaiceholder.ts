import { getPlaiceholder } from "plaiceholder"

export default async function getBlurDataURL(src: string | undefined) {
  try {
    if (!src) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg==';
    }

    // Convertir les chemins relatifs en URLs absolues
    const imageUrl = src.startsWith('/')
      ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${src}`
      : src;

    const buffer = await fetch(imageUrl).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Impossible de récupérer l'image: ${res.status} ${res.statusText}`);
      }
      return Buffer.from(await res.arrayBuffer());
    });

    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (error) {
    console.error("Erreur lors de la génération du blurDataURL:", error);
    // Retourner une valeur par défaut en cas d'erreur
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg==';
  }
}
