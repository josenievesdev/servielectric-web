# Hero y franja de marcas

- `antes-hero-1440.png`: estado previo del hero.
- `hero-{390,768,1440}.png`: composición actual.
- `hero-negocio-{390,768,1440}.png`: sustantivo más largo, con espacio de descendentes.
- `marcas-{390,768,1440}.png`: franja demostrable en desarrollo con rótulos neutros.
- `marcas-reduced-390.png`: lista completa estática.
- `hero-1440.webm`: una vuelta real completa del hero.
- `marcas-1440.webm`: desplazamiento real a 24 px/s, pausa por teclado y reanudación.
- `hero-frame-*.png` y `marcas-frame-*.png`: fotogramas extraídos de las grabaciones para verificar la salida/entrada y la nitidez central.

Las marcas todavía no están confirmadas: esta demostración solo aparece en desarrollo. La compilación de producción excluye la franja hasta completar `src/data/marcas.ts` con confirmación del negocio y archivos aprobados. Las capturas de iteraciones anteriores se conservan en sus carpetas.

El contraste del sustantivo cobre sobre blanco se comprobó en 6,54:1. Las grabaciones se revisaron mediante sus fotogramas: prefijo, separador y botones inmóviles, descendentes completos y extremos de blur fijos.
