export interface Imagen {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
  pie: string;
  ajuste: 'contain' | 'cover';
}

// Sustituir aquí cada imagen por la fotografía aprobada, incluido su alt.
// Figura.astro solo pinta la imagen si el archivo existe en public/; si falta, muestra un marco neutro
// con la misma proporción. Los pies son públicos: no usarlos para notas internas.
export const imagenes = {
  // Fotografía del hero, pendiente de entrega. Basta con guardarla en public/images/portada.jpg
  // (o cambiar esta ruta) y escribir en alt lo que muestra. El marco recorta con cover: 3:2 en móvil
  // y escritorio, 2:1 en tablet.
  portada: {
    src: '/images/portada.jpg',
    alt: '',
    ancho: 1500,
    alto: 1000,
    pie: '',
    ajuste: 'cover',
  },
  fundador: {
    src: '/images/retrato-encuadre.svg',
    alt: 'Boceto neutro de encuadre de retrato, sin rasgos ni identidad de una persona real.',
    ancho: 400,
    alto: 500,
    pie: '',
    ajuste: 'contain',
  },
  ubicacion: {
    src: '/images/ubicacion-encuadre.svg',
    alt: 'Encuadre provisional con un marcador de ubicación. No representa la fachada del local.',
    ancho: 800,
    alto: 560,
    pie: '',
    ajuste: 'contain',
  },
} as const satisfies Record<string, Imagen>;
