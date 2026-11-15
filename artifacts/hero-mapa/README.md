# Revisión del hero y Google Maps

- `hero-{390,768,1440}.png`: portada en la frase inicial, con movimiento reducido.
- `hero-negocio-{390,768,1440}.png`: frase más larga, sin variación en la posición de descripción/acciones.
- `ubicacion-{390,768,1440}.png`: captura del iframe real, sin sustituir su contenido por un mock.
- `landing-{390,768,1440}.png`: página completa para comprobar la integración.

Las capturas de iteraciones anteriores se conservan en `artifacts/composicion/` y `artifacts/revision/`. Las pruebas registran la respuesta de Google Maps y sus posibles restricciones de red en la salida de consola y en un adjunto de `.cache/playwright-results/`.

Resultado de esta sesión: Google Maps respondió con HTTP 200 tras la redirección de incrustación; las capturas de Ubicación muestran el marcador y las calles próximas en los tres tamaños. El hero se comprobó con movimiento reducido, sin JavaScript y durante la secuencia única; «para tu negocio.» cabe y no desplaza las acciones.
