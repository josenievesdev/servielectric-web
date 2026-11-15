# Dirección de la composición actual

## Referencias revisadas

Los originales se conservan en `designe/`: `Landing Desktop 1440-export.html`, `Landing Movil 390-export.html`, `designe_servielectric_desktop.webp` y `designe_servielectric_movile.webp`.

Se retienen el fondo blanco de la portada, la franja amarilla, la tipografía Barlow/Inter, las familias técnicas sobre azul, la historia y el cierre de ubicación. Se reconstruye el HTML semántico con una sola composición adaptable. Los originales usan lienzos fijos y fotografías de referencia incrustadas, no recursos auténticos identificados. Se reutiliza la referencia de bobinas con un pie explícito de pen.dev. No se usan sus fachadas inconsistentes ni el logo placeholder.

La marca es **Servielectric Ferreteria**. La firma de dos líneas muestra `SERVIELECTRIC` y `FERRETERIA`; no lleva «eléctrica» ni tilde en el nombre propio.

## Plan antes de implementar

- Paleta: azul institucional `#01177D`, amarillo de cotización/selección `#FECF0F`, blanco `#FFFFFF`, texto `#1A2238`, texto secundario `#505A74`, fondo suave `#F5F6FA`; cobre `#914A27` solo para el sustantivo variable (6,54:1 sobre blanco).
- Tipografía: Barlow 600/700 para marca, titulares y familias técnicas; Inter 400/500/600/700 para lectura y acciones. Archivos locales con licencia OFL. Georgia cursiva, peso 500, para la frase variable, sin descargar otra fuente.
- Portada: antetítulo «Valledupar · Desde 1989», fijo «Materiales eléctricos» y prefijo serif azul «para tu». Solo cambia el sustantivo cobre «obra./negocio./hogar.». Separador fino antes de la invitación a cotizar. Contenido 48 % / fotografía 52 %. La ilustración de la bobina se retiró: un marco neutro de proporción estable (3:2; 5:2 en tablet) espera la foto en `public/images/portada.jpg`.
- Suministros: título y una línea de ayuda arriba; debajo, cuatro filas siempre visibles separadas por líneas finas sobre el azul. Cada fila: nombre Barlow, línea breve con lo confirmado y consulta por WhatsApp (texto amarillo desde tablet, círculo amarillo de 44 px en móvil). Toda la fila es el área táctil. Sin acordeón ni foto: la única fotografía disponible era una referencia de pen.dev que, sin su pie, pasaría por inventario propio.
- Marcas: franja clara entre Soluciones e Historia. Título a la izquierda y pista a la derecha; título encima en móvil. A 24 px/s si desborda; estática si cabe. Extremos fijos con máscara y blur progresivo, centro nítido. Botón discreto de pausa y lista completa estática con movimiento reducido. Sin confirmaciones se muestra solo una demostración neutra en desarrollo.
- Historia: rótulo, fundador y texto agrupados; retrato de 15 rem centrado con el texto en escritorio y de 88 px junto al nombre en móvil. Sin rostro atribuido, relato añadido ni pie interno.
- Ubicación: título, dirección, teléfono y acciones a la izquierda; mapa real de Google a la derecha, en la misma columna exterior del hero. En móvil, el mapa sigue a las acciones. Iframe diferido con tamaño reservado, coordenadas exactas y zoom 17. Los botones de indicaciones son independientes del iframe.
- Movimiento del hero: ciclo continuo obra → negocio → hogar → obra… mientras la portada está visible; se pausa con la pestaña oculta, fuera de pantalla o con el botón de pausa del separador. Reposo 3 s y transición 500 ms, saliente hacia arriba y entrante desde abajo 0,35 em, con pérdida de opacidad. Una celda Grid mide todos los sustantivos desde el SSR y el recorte deja aire a descendentes. Prefijo, separador y acciones inmóviles. Movimiento reducido y ausencia de JavaScript dejan «obra.» estática; el nombre accesible del H1 no cambia.

```text
Escritorio                         Móvil / tablet
marca      nav centrada    Cotizar  marca         menú
Valledupar · Desde 1989 [foto 3:2]  Valledupar · Desde 1989
Materiales eléctricos              Materiales eléctricos
para tu obra.                      para tu obra.
-------------------- ‖              -------------------- ‖
texto + acciones                   texto + acciones
                                   [foto 3:2 / 5:2]
azul: título + línea               azul: título + línea
nombre · línea · consulta (x4)     nombre / línea   (wa) (x4)
marcas [pista] · solo dev          marcas + pista · solo dev
historia + fundador [retrato menor] [retrato] fundador / historia
ubicación + CTA [Google Maps]       ubicación + CTA + Google Maps
pie: marca · ventas · perfiles   pie: marca / ventas / perfiles
```

Revisión del plan: se conserva un único margen de contenido. Hero y mapa comparten columnas, separación y proporción 3:2. El sustantivo concentra el gesto de portada; la foto permanece quieta. Encabezado en tres columnas (marca, navegación centrada, Cotizar) y pie con marca grande, ventas por WhatsApp y perfiles oficiales cuando haya URL. Espaciado corregido en cada componente (`--section-compact` para Suministros, Historia y Ubicación); comparación antes/después en `artifacts/ritmo-suministros/`. La pista de marcas se anima de forma independiente de las capas fijas de blur. Las demás secciones conservan su composición. Evidencia actual, incluidos WEBM, en `artifacts/hero-marcas/`; iteraciones previas conservadas en sus carpetas.

## Referencias que se conservan para fotografía y familias

- [ERCO Inspiration](https://www.erco.com/en/inspiration/): fotografías reales en contexto y relaciones entre luz, material y uso. Para futuras tomas propias, priorizar al asesor mostrando un breaker en el mostrador, conservando mano y pieza en el recorte móvil.
- [Flos Architectural](https://professional.flos.com/en/global/catalogs/architectural/): jerarquía clara de familias técnicas. Aplicada como cuatro categorías legibles y consultables; no se implementa catálogo.
- [Ink Orbit](https://21st.dev/@kedhareswer/components/ink-orbit-hero): titular fijo/variable con línea serif, separador fino y pieza visual propia. Adaptación original sin instalar la plantilla, sin escultura orbital ni funciones de demo.
- [Progressive Blur with logos](https://21st.dev/@ibelick/components/progressive-blur/with-logos): capas laterales de desenfoque fijo, independientes de la pista de logos; implementado sin Motion ni otras dependencias.

## Skill

`frontend-design` de Anthropic cubre dirección visual, tipografía, responsive accesible y autocrítica con capturas. Fuente y revisión en `.opencode/skills/frontend-design/SOURCE.md`. Herramienta de revisión: Playwright/Chromium ya disponible en el proyecto.

`animate`, disponible en el entorno, guía la transición ocasional del titular para hacer legible el cambio: CSS transition, `opacity`/`transform`, curva `cubic-bezier(0.23, 1, 0.32, 1)`, 500 ms, sin librerías ni bucle permanente. La pista utiliza CSS lineal, pausa accesible y reducción de movimiento.
