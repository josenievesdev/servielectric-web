# Ritmo vertical, Suministros, encabezado y pie

- `comparacion-{390,768,1440}.png`: página completa antes (izquierda) y después (derecha), a la misma escala y con el inicio de cada sección marcado al margen. Es la comparación principal del ritmo vertical.
- `antes/landing-{390,768,1440}.png` y `despues/landing-…png`: capturas completas del servidor de desarrollo (`localhost:4321`, con la franja de marcas de demostración) y movimiento reducido para fijar «obra.». `tramos/` divide cada una en pantallas de 844/1024/900 px.
- `antes/metricas.json` y `despues/metricas.json`: posiciones y alturas de cada sección y distancias clave (encabezado → antetítulo, botones → título de Suministros, Marcas → Historia).
- `despues/produccion-*.png`, `menu-390.png`, `fila-tableros-390.png`, `hero-*.png`, `hero-negocio-*.png`, `ubicacion-*.png` y `marcas-*.png`: capturas generadas por `npm run test:e2e` (preview de producción salvo la franja de marcas, que solo existe en desarrollo).

El mapa de Google sale en blanco en las capturas de página completa, aunque el script espera a que cargue; en `ubicacion-*.png`, capturada por elemento, sí se ve con el marcador y las calles.

| Medida (desarrollo) | Antes | Después |
| --- | --- | --- |
| Alto total a 390 px | 4243 | 3668 |
| Alto total a 768 px | 4631 | 3430 |
| Alto total a 1440 px | 3399 | 2986 |
| Encabezado → antetítulo a 1440 px | 126 | 61 |
| Botones del hero → título de Suministros a 1440 px | 277 | 172 |
| Fin de Marcas → «Nuestra historia» a 1440 px | 220 | 131 |
| Suministros a 390 px | 1055 | 733 |
| Historia a 390 px | 726 | 412 |

Las capturas de iteraciones anteriores se conservan en sus carpetas.
