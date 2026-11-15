import { readFile, writeFile } from 'node:fs/promises';

// Solo extrae el recurso binario de referencia; nunca modifica la exportación.
const origen = new URL('../designe/Landing Desktop 1440-export.html', import.meta.url);
const destino = new URL('../public/images/bobinas-referencia.jpg', import.meta.url);
const html = await readFile(origen, 'utf8');
const bloque = html.split('data-pencil-name="Sol Foto"')[1]?.split('></div>')[0];
const base64 = bloque?.match(/data:image\/jpeg;base64,([^']+)/)?.[1];
if (!base64) throw new Error('No se encontró la referencia de bobinas en el bloque Sol Foto.');
const imagen = Buffer.from(base64, 'base64');
if (imagen[0] !== 0xff || imagen[1] !== 0xd8) throw new Error('La referencia no es un JPEG válido.');
await writeFile(destino, imagen);
console.log(`Referencia de bobinas extraída: ${imagen.byteLength} bytes.`);
