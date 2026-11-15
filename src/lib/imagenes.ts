import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** true si la ruta pública (p. ej. «/images/portada.jpg») tiene archivo en public/. Se evalúa al renderizar. */
export function existeEnPublic(src: string): boolean {
  return src.trim() !== '' && existsSync(join(process.cwd(), 'public', src));
}
