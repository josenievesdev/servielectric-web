export interface MarcaVisual {
  nombre: string;
  logo?: string;
  ancho: number;
  alto: number;
  anchoOptico: number;
  estilo?: 'sans' | 'serif' | 'compacta' | 'espaciada';
}

export interface MarcaConfirmada extends MarcaVisual {
  logo: string;
  /** Fecha y fuente de confirmación actual del negocio; la fachada no es confirmación. */
  confirmacion: string;
}

// Completar únicamente con marcas vigentes confirmadas y su archivo de logo aprobado.
// Ejemplo de campos: nombre, logo, ancho, alto, anchoOptico y confirmacion.
export const marcasConfirmadas: readonly MarcaConfirmada[] = [];

// Nombres de las referencias de fachada: pendientes de consulta, nunca se publican aquí.
export const marcasPorConsultar = ['3M', 'Philips', 'Sylvania'] as const;

// Rótulos neutros para evaluar proporciones y movimiento, solo en modo desarrollo.
export const marcasDeMuestra: readonly MarcaVisual[] = [
  { nombre: 'Marca 01', ancho: 140, alto: 42, anchoOptico: 140, estilo: 'sans' },
  { nombre: 'Marca 02', ancho: 150, alto: 42, anchoOptico: 150, estilo: 'serif' },
  { nombre: 'M·03', ancho: 100, alto: 48, anchoOptico: 100, estilo: 'compacta' },
  { nombre: 'Marca 04', ancho: 160, alto: 32, anchoOptico: 160, estilo: 'espaciada' },
  { nombre: 'Marca 05', ancho: 140, alto: 42, anchoOptico: 140, estilo: 'serif' },
  { nombre: 'Marca 06', ancho: 140, alto: 42, anchoOptico: 140, estilo: 'sans' },
];
