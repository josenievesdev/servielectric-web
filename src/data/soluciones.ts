export type AreaId = 'media-baja-tension' | 'iluminacion' | 'automatizacion' | 'redes';

interface Solucion {
  id: AreaId;
  titulo: string;
  /** Línea visible con la fila cerrada: lo que se reconoce de un vistazo. */
  resumen: string;
  /** Qué cubre el área; se lee al desplegarla. */
  descripcion: string;
  especialidades: readonly string[];
  mensaje: string;
  /** Foto del área. Si el archivo no existe en public/, se muestra la ilustración animada del área. */
  foto: { src: string; alt: string };
}

// Contenido confirmado: datos del proyecto y página oficial de LinkedIn de la empresa
// («Especialidades», «Sobre nosotros» y «¿Qué ofrecemos?», consultada el 15/11/2026).
// No añadir marcas, clientes ni materiales que la empresa no haya confirmado.
export const soluciones = [
  {
    id: 'media-baja-tension',
    titulo: 'Media y baja tensión',
    resumen: 'Tableros a medida, breakers, transformadores, cables y protecciones.',
    descripcion: 'Equipos y materiales para redes de media y baja tensión, subestaciones y obras de construcción, con tableros eléctricos armados a la medida de cada proyecto.',
    especialidades: ['Tableros eléctricos a medida', 'Breakers industriales y comerciales', 'Transformadores', 'Subestaciones eléctricas', 'Cables y protecciones', 'Accesorios para construcción'],
    mensaje: 'Hola, quisiera cotizar materiales de media y baja tensión',
    foto: { src: '/images/suministros/media-baja-tension.jpg', alt: '' },
  },
  {
    id: 'iluminacion',
    titulo: 'Iluminación',
    resumen: 'Iluminación pública, deportiva, comercial e industrial.',
    descripcion: 'Iluminación para espacios comerciales, industriales y públicos, incluidos escenarios deportivos. Cuéntanos qué espacio necesitas iluminar y te asesoramos.',
    especialidades: ['Iluminación pública', 'Iluminación deportiva', 'Espacios comerciales', 'Espacios industriales'],
    mensaje: 'Hola, necesito asesoría para cotizar iluminación',
    foto: { src: '/images/suministros/iluminacion.jpg', alt: '' },
  },
  {
    id: 'automatizacion',
    titulo: 'Automatización y control',
    resumen: 'Automatización de procesos y control industrial.',
    descripcion: 'Automatización de procesos industriales y control, también para pequeñas empresas. Envíanos tu lista de materiales y te asesoramos.',
    especialidades: ['Control industrial', 'Automatización de procesos', 'Soluciones para pequeñas empresas'],
    mensaje: 'Hola, quisiera consultar sobre automatización y control',
    foto: { src: '/images/suministros/automatizacion.jpg', alt: '' },
  },
  {
    id: 'redes',
    titulo: 'Redes y comunicaciones',
    resumen: 'Redes estructuradas, cable UTP y apantallamientos.',
    descripcion: 'Redes estructuradas y comunicaciones para empresas y colegios, con asesoría y ejecución de proyectos de telecomunicaciones.',
    especialidades: ['Redes estructuradas', 'Cable UTP y apantallamientos', 'Comunicaciones para colegios', 'Proyectos de telecomunicaciones'],
    mensaje: 'Hola, quisiera cotizar materiales para redes y comunicaciones',
    foto: { src: '/images/suministros/redes.jpg', alt: '' },
  },
] as const satisfies readonly Solucion[];
