interface Solucion {
  id: string;
  titulo: string;
  /** Línea visible de la fila: solo ejemplos o indicaciones confirmados por el negocio. */
  resumen: string;
  mensaje: string;
}

// Solo Media y baja tensión tiene ejemplos de materiales confirmados. Las otras tres conservan
// su indicación confirmada; añadir ejemplos aquí únicamente cuando el negocio los confirme.
export const soluciones = [
  {
    id: 'media-baja-tension',
    titulo: 'Media y baja tensión',
    resumen: 'Cables, tableros, breakers y protecciones.',
    mensaje: 'Hola, quisiera cotizar materiales de media y baja tensión',
  },
  {
    id: 'iluminacion',
    titulo: 'Iluminación',
    resumen: 'Cuéntanos qué espacio necesitas iluminar y te asesoramos.',
    mensaje: 'Hola, necesito asesoría para cotizar iluminación',
  },
  {
    id: 'automatizacion',
    titulo: 'Automatización y control',
    resumen: 'Envíanos tu lista de materiales para asesorarte.',
    mensaje: 'Hola, quisiera consultar sobre automatización y control',
  },
  {
    id: 'redes',
    titulo: 'Redes y comunicaciones',
    resumen: 'Envíanos los requerimientos de tu instalación.',
    mensaje: 'Hola, quisiera cotizar materiales para redes y comunicaciones',
  },
] as const satisfies readonly Solucion[];
