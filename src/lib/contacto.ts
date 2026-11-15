import { empresa } from '../data/empresa';

/** Prepara el chat; el visitante decide si envía el mensaje. */
export function whatsappUrl(mensaje: string): string {
  return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
