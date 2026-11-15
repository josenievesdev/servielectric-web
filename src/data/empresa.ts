export const empresa = {
  nombre: 'Servielectric Ferreteria',
  marca: 'Servielectric',
  actividad: 'Ferreteria',
  titular: 'Materiales eléctricos en Valledupar',
  portada: '¿Tienes una lista de materiales? Envíanosla y te ayudamos a cotizar',
  hero: {
    antetitulo: 'Valledupar · Desde 1989',
    titulo: 'Materiales eléctricos',
    prefijo: 'para tu',
    palabras: ['obra.', 'negocio.', 'hogar.'],
  },
  trayectoria: 'Desde 1989',
  // Lema y servicios tomados de la página oficial de LinkedIn (consultada el 15/11/2026).
  eslogan: 'Iluminamos la región',
  servicios: 'Además, asesoría y ejecución de proyectos de telecomunicaciones y mantenimiento de sistemas eléctricos para empresas, clínicas, hospitales y colegios.',
  fundador: 'Adrián Nieves Ibarra',
  historia: 'Adrián Nieves Ibarra fundó Servielectric Ferreteria en Valledupar. Desde 1989, la empresa atiende las necesidades de materiales eléctricos de la región',
  direccion: 'Calle 19 # 8-46, Valledupar, Cesar.',
  whatsapp: '573150605678',
  telefonoVisible: '+57 315 060 5678',
  // Correo de contacto: completar solo con la dirección oficial. Vacío = el pie no muestra el botón de correo.
  correo: '',
  mensajeCotizacion: 'Hola, quisiera cotizar una lista de materiales eléctricos',
  coordenadas: '10.4717158,-73.2443218',
  descripcion: 'Materiales eléctricos en Valledupar. Cotiza suministros eléctricos, iluminación, automatización y redes con Servielectric Ferreteria por WhatsApp.',
} as const;

export interface PerfilOficial {
  red: 'Instagram' | 'LinkedIn';
  url: string;
}

// URLs entregadas por la empresa (sin parámetros de seguimiento). Un perfil sin URL no se muestra en el pie.
export const perfilesOficiales: readonly PerfilOficial[] = [
  { red: 'Instagram', url: 'https://www.instagram.com/servielectricferreteria/' },
  { red: 'LinkedIn', url: 'https://www.linkedin.com/company/servielectric-ferreteria/' },
];

export const indicacionesUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(empresa.coordenadas)}`;

export const mapaEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(empresa.coordenadas)}&z=17&hl=es&output=embed`;
