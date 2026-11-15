# Recursos de composición

Los SVG son bocetos originales, deliberadamente ilustrados y reemplazables. No son fotografías del personal, productos disponibles ni del local. No se atribuye una identidad a la silueta del retrato.

- `portada.jpg` (pendiente): fotografía del hero que entregará la empresa. Basta con guardarla con este nombre y describirla en `alt` en `src/data/imagenes.ts`. Mientras no exista, el hero muestra un marco neutro de la misma proporción (3:2; 5:2 en tablet) sin pedir la imagen. El recorte es `cover`, centrado.
- `suministros/{media-baja-tension,iluminacion,automatizacion,redes}.jpg` (pendientes): una foto por área de Suministros, por ejemplo de Instagram. Cada una sustituye a su ilustración animada en el mismo marco 16:10 (recorte `cover`); escribir su `alt` en `src/data/soluciones.ts`.
- `bobina-azul.svg`: ilustración de la iteración anterior del hero. Se conserva como archivo; ya no se muestra.
- `asesor-mostrador.svg`: encuadre del asesor de una iteración anterior; conservado como recurso, no se muestra.
- `retrato-encuadre.svg`: encuadre neutro de retrato del fundador, sin pie visible.
- `iluminacion.svg`, `automatizacion.svg`, `redes.svg`: bocetos anteriores de las familias técnicas. Se conservan; Suministros usa ahora ilustraciones animadas en línea (`src/components/IlustracionArea.astro`).
- `ubicacion-encuadre.svg`: reserva visual de una iteración anterior. Se conserva como archivo, pero Ubicación muestra un mapa interactivo real de Google.
- `bobinas-referencia.jpg`: referencia visual incrustada en `designe/Landing Desktop 1440-export.html`, bloque `Sol Foto`. Es una referencia de pen.dev, no una foto del inventario de la empresa; por eso dejó de mostrarse al retirar su pie de la vista pública. Extraíble con `node scripts/extraer-bobinas.mjs`.

La imagen auténtica de la esquina no está en los archivos entregados. Las fachadas generadas de los renders no se utilizan para orientar visitantes. La dirección y el destino de Maps se conservan en `src/data/empresa.ts`.

Cambiar las rutas y textos alternativos en `src/data/imagenes.ts` para sustituir las referencias por originales aprobados sin alterar la distribución. Los pies de imagen son públicos: no usarlos para notas internas.
