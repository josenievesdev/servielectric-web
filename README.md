# Servielectric Ferreteria

Landing institucional de materiales eléctricos en Valledupar. Una sola página responsive en Astro, con portada de texto y fotografía, cuatro áreas de suministro desplegables con información e ilustraciones animadas, fundador y ubicación. Generación estática, TypeScript estricto, HTML semántico y CSS; sin catálogo ni backend.

Nombre exacto: **Servielectric Ferreteria**, sin tilde en «Ferreteria». La marca de encabezado y pie tiene `SERVIELECTRIC` arriba y `FERRETERIA` abajo. Los datos, título, descripción SEO, historia y nombres accesibles usan el nombre exacto. El título SEO sigue describiendo materiales eléctricos en Valledupar; el único H1 tiene el nombre accesible estable «Materiales eléctricos para tu obra.».

## Ejecutar en Windows / PowerShell

Requisitos: Node.js >=22.23.4 y npm >=9.6.5. Creado con Node.js 24.18.0 y npm 12.2.0. Astro 7.4.12 y TypeScript 5.9.3 (compatible con `@astrojs/check`), con versiones fijadas y `package-lock.json`.

```powershell
Set-Location -LiteralPath "C:\Users\jo5e\Desktop\Dev\servielectric-web"
npm ci
npm run dev
```

Abrir `http://localhost:4321`. El servidor de desarrollo existente se conserva en el puerto 4321 para el túnel de VS Code. En una nueva sesión se puede fijar con `npm run dev -- --port 4321 --strictPort`.

```powershell
npm run check
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

`preview` requiere una compilación previa. No publica el sitio.

## Organización

- `src/data/empresa.ts`: datos comerciales, frases del hero, historia, SEO, coordenadas compartidas por Maps Embed e indicaciones y perfiles oficiales (`perfilesOficiales`).
- `src/data/soluciones.ts`: cuatro áreas con línea visible (`resumen`), descripción, especialidades, ruta de foto y mensaje de consulta. Contenido confirmado en la página oficial de LinkedIn.
- `src/data/marcas.ts`: lista editable de marcas confirmadas, rótulos neutros de demostración y nombres por consultar.
- `src/data/imagenes.ts`: rutas, dimensiones, encuadres y textos alternativos; punto único para sustituir referencias por originales, incluida la foto del hero.
- `src/lib/contacto.ts`: construcción de WhatsApp con `encodeURIComponent`.
- `src/lib/imagenes.ts`: comprueba si una ruta pública tiene archivo; una foto pendiente no genera peticiones rotas.
- `src/components/`: encabezado, presentación, suministros (`Soluciones.astro`), historia, ubicación y pie.
- `src/layouts/Base.astro`: documento, idioma y metadatos.
- `src/styles/global.css`: colores, escala tipográfica y composición responsive móvil primero.
- `src/pages/index.astro`: composición de la página.
- `public/fonts/`: Barlow 600/700 e Inter variable, autoalojadas; licencia y procedencia incluidas.
- `public/images/`: bocetos SVG reemplazables, referencia de bobinas extraída de pen.dev y lugar de la futura `portada.jpg`; procedencia en su README.
- `src/components/Figura.astro`: marco de imagen con dimensiones explícitas y pie opcional. Si el archivo no existe en `public/`, pinta un marco neutro con la misma proporción y no pide la imagen.
- `src/components/Marcas.astro`: franja reutilizable, movimiento CSS a 24 px/s, pausa al pasar el puntero y extremos de desenfoque fijos.
- `src/components/IlustracionArea.astro`: ilustraciones técnicas animadas (SVG) de cada área de Suministros.
- `src/components/Icono.astro`: íconos Phosphor duotono (MIT); licencia en `src/components/ICONOS-LICENCIA.txt`.
- `docs/direccion-visual.md`: plan visual, decisiones y referencias ERCO/Flos.
- `artifacts/revision/`: capturas de la implementación.
- `artifacts/composicion/antes/` y `artifacts/composicion/despues/`: comparación de esta corrección a 1440, 768 y 390 px; conserva las capturas previas.
- `artifacts/hero-mapa/`: capturas de hero y Ubicación actuales, incluida la frase más larga y el iframe real.
- `artifacts/hero-marcas/`: capturas a 390/768/1440, vídeos WEBM del hero y de la franja y fotogramas de revisión de la iteración anterior.
- `artifacts/ritmo-suministros/`: iteración anterior; página completa antes y después a 390/768/1440, comparaciones y métricas de ritmo vertical.
- `artifacts/suministros-interactivo/`: capturas actuales (Suministros desplegables, encabezado fijo, Ubicación y pie) y comparación con la iteración anterior. Se conservan las capturas anteriores.

Los enlaces son HTML nativo y abren en la misma pestaña. WhatsApp solo prepara un chat: el visitante decide si envía el mensaje. Se conserva el número `573150605678`, el mensaje general y los cuatro específicos. Maps abre indicaciones hacia `10.4717158,-73.2443218` sin origen preseleccionado.

El menú móvil es un botón con `aria-expanded` y `aria-controls`: abre/cierra con toque, Enter o Espacio; Escape lo cierra y devuelve el foco. También se cierra al elegir una sección o pulsar fuera. Al pasar a escritorio, se muestra la misma navegación. Sin JavaScript, los enlaces quedan visibles.

## Encabezado y pie

- Encabezado fijo (`position: sticky`). Arriba es blanco; al bajar se vuelve translúcido con desenfoque (`backdrop-filter`) y una sombra suave, y una barra amarilla en su borde inferior muestra el avance de lectura (`--avance`, calculado con `requestAnimationFrame`). Las anclas dejan su altura libre con `scroll-padding-top`.
- Escritorio: rejilla de tres columnas (`1fr auto 1fr`). La marca queda en el borde izquierdo, alineada con el hero; la navegación se centra con una subrejilla y Cotizar queda alineado con la foto del hero. Los enlaces muestran un subrayado amarillo que crece desde la izquierda.
- Móvil: el menú se despliega sobre la página (no empuja el contenido), con toque, Enter o Espacio; Escape lo cierra y devuelve el foco.
- Marca tipográfica. En LinkedIn existe el símbolo oficial (rayo dentro del círculo), pero solo como JPG de 200 px con fondo blanco: no se usa hasta tener un SVG o PNG transparente.
- Pie sobre azul noche: marca grande con el lema «Iluminamos la región» (LinkedIn), botón de WhatsApp con el número dentro («Escríbenos por WhatsApp»), botones de Instagram y LinkedIn (abren en otra pestaña) y «Volver arriba» como botón secundario con icono. No repite dirección ni mapa.
- **Pendiente:** correo electrónico oficial. El botón «Correo» aparece en cuanto se complete `empresa.correo` en `src/data/empresa.ts`.

## Suministros

Fondo azul. Título, una línea de ayuda y debajo las cuatro áreas en filas: nombre, línea breve y un botón circular para desplegar. La fila completa despliega o pliega su información; ya no envía a WhatsApp. En escritorio la primera área llega abierta; en tablet y móvil se ven las cuatro filas cerradas.

- Al desplegar: descripción de qué cubre el área, sus especialidades y «Cotizar por WhatsApp» con el mensaje de esa área. En escritorio, texto a la izquierda e imagen a la derecha; en móvil, la imagen primero.
- Animación: la altura se abre con una rejilla `0fr → 1fr`; la imagen entra con un barrido (`clip-path`) y el texto sube escalonado. Las ilustraciones se trazan y se encienden: breakers y LED del tablero con energía desde el transformador; luminarias que parpadean y se encienden; señal por el cableado y engranajes que giran; datos que viajan por el cable UTP. La primera área anima al entrar la sección en pantalla.
- Contenido confirmado: datos del proyecto y la página oficial de LinkedIn («Especialidades», «Sobre nosotros», «¿Qué ofrecemos?»), consultada el 15/11/2026. Una línea final resume servicios: asesoría y ejecución de proyectos de telecomunicaciones y mantenimiento para empresas, clínicas, hospitales y colegios.
- Fotos por área: guardar `public/images/suministros/{media-baja-tension,iluminacion,automatizacion,redes}.jpg` y escribir su `alt` en `src/data/soluciones.ts`. Cada foto sustituye a su ilustración en el mismo marco 16:10.
- Accesibilidad: cada nombre es un botón con `aria-expanded` y `aria-controls`, descrito por su línea breve; el panel es una región etiquetada. Sin JavaScript las cuatro áreas quedan abiertas. Con movimiento reducido no hay animaciones y las ilustraciones aparecen completas.

Los controles locales tienen al menos 44 × 44 px. Con movimiento reducido no hay desplazamiento suave, ni apariciones, ni transiciones del encabezado.

Flujo principal: inicio → cotizar por WhatsApp → revisar y enviar el mensaje. Alternativas: suministros → desplegar área → consulta específica; ubicación → indicaciones en Maps; pie → WhatsApp o redes.

## Ritmo vertical

El espaciado se corrigió en el componente que lo originaba, sin reducir márgenes de forma global:

- Hero: la foto (3:2) mide casi lo mismo que el bloque de texto y el padding superior/inferior es menor. A 1440 px, del encabezado al antetítulo hay 61 px (antes 126) y de los botones al título de Suministros 172 px (antes 277).
- Suministros, Historia y Ubicación usan `--section-compact` (56 → 88 px). `.section` conserva su valor por defecto.
- Historia: retrato de 15 rem centrado con el texto en escritorio; en móvil, retrato de 88 px junto al nombre del fundador (antes 340 px de bloque casi vacío).
- Ubicación: el mapa toma la proporción 3:2 del hero desde tablet y su borde derecho coincide con el de la foto.
- Altura total de la página tras la corrección de ritmo: 390 px 4243 → 3668; 768 px 4631 → 3430; 1440 px 3399 → 2986 (desarrollo, con la franja de marcas de demostración). Con Suministros desplegable y el pie ampliado: 4023, 3655 y 3612 px; en escritorio la primera área llega abierta.

## Hero: Ink Orbit adaptado a Servielectric

Referencia: [Ink Orbit de 21st.dev](https://21st.dev/@kedhareswer/components/ink-orbit-hero). Se retoman el titular fijo/variable, la separación fina y una pieza visual autónoma. Implementación propia con Astro/CSS y un script pequeño, sin dependencias de la plantilla.

- Distribución de escritorio: 48 % texto / 52 % fotografía, descontando el espacio entre columnas. Mismo margen del encabezado y misma columna derecha que el mapa.
- Antetítulo: «Valledupar · Desde 1989».
- Parte fija Barlow: «Materiales eléctricos». En Georgia cursiva, «para tu» permanece fijo y azul; solo cambian «obra.», «negocio.» y «hogar.» en cobre `#914A27`. Su contraste sobre blanco es **6,54:1**.
- Una celda CSS Grid mide los tres sustantivos desde el HTML y reserva el ancho de «negocio.». El recorte añade aire bajo la línea para los descendentes de la g y la j. Prefijo, separador, párrafo y botones conservan su posición.
- Ciclo continuo mientras la portada está visible: obra → negocio → hogar → obra → negocio… Cada palabra permanece quieta 3000 ms y la transición dura 500 ms (un cambio cada 3,5 s).
- Un único temporizador: toda programación pasa por `programar()`, que cancela antes de crear. Con la pestaña oculta (`visibilitychange`) o con la portada fuera de pantalla (`IntersectionObserver`) el ciclo se pausa; al volver espera un reposo completo y sigue. Una transición en curso termina antes de pausar.
- Sin botones de pausa visibles: el ciclo se detiene mientras el puntero está sobre el titular y respeta la preferencia de movimiento reducido.
- La compilación minifica `--hero-transition: 500ms` como `.5s`; el script interpreta la unidad. Antes leía 0,5 ms en producción y la palabra saliente perdía su salida hacia arriba.
- La palabra saliente sube `0.35em` y pierde opacidad; la siguiente entra desde abajo. Curva de desaceleración `cubic-bezier(0.23, 1, 0.32, 1)`. Solo se animan opacidad y transform.
- Con movimiento reducido o sin JavaScript queda la primera frase estática. Si la preferencia cambia durante la secuencia, se cancela y vuelve al inicio; si se vuelve a permitir el movimiento, el ciclo continúa. No se usa `aria-live`; las frases visuales están ocultas al lector de pantalla y el H1 mantiene una etiqueta accesible estable.
- Fotografía del hero: se retiró la ilustración de la bobina (`bobina-azul.svg` se conserva como archivo, sin uso). **Para sustituirla, guardar la foto en `public/images/portada.jpg`** (o cambiar `imagenes.portada.src` en `src/data/imagenes.ts`) y escribir su `alt` allí. Mientras el archivo no exista, `Figura.astro` muestra un marco neutro `#EEF0F4` sin petición rota. Proporción estable con recorte `cover`: 3:2 en móvil y escritorio y 5:2 en tablet de una columna, para que en móvil no quede un bloque enorme.

## Franja de marcas: demostración local y publicación

La franja está colocada después de Soluciones y antes de Nuestra historia. Su título es «Marcas que encuentras en Servielectric». En escritorio se sitúa a la izquierda y la pista a la derecha; en móvil, encima.

**No hay marcas vigentes confirmadas ni archivos de logos aprobados en los datos entregados.** Por eso, en `npm run dev` se muestra una demostración explícita con rótulos neutros («Marca 01», etc.). `npm run build` y `npm run preview` excluyen esa demostración: no se publica la franja mientras `marcasConfirmadas` esté vacía.

Para habilitarla con datos reales, completar `src/data/marcas.ts`: nombre, ruta del logo aprobado, dimensiones originales, ancho óptico y fuente/fecha de confirmación del negocio. La ficha de pendientes está en `docs/marcas-pendientes.md`; 3M, Philips y Sylvania son solo nombres por consultar a partir de referencias de fachada. No se afirma disponibilidad actual ni distribución autorizada.

`Marcas.astro` admite las props `marcas`, `titulo` e `id`. Mantiene las proporciones de los logos con `object-fit: contain` y anchos ópticos por marca. Si la lista desborda, una pista CSS se desplaza linealmente a 24 px/s; si cabe, se queda estática. La copia de cierre tiene `aria-hidden="true"`. Sin botón visible: el movimiento se pausa al pasar el puntero por encima y fuera de pantalla.

El desplazamiento y el desenfoque son independientes: dos capas fijas en los extremos combinan máscaras y blur de 1/3/6 px. El centro no se filtra. En móvil los extremos se reducen a 28 px. Sin `backdrop-filter`, el fondo degradado produce un desvanecimiento lateral. Con movimiento reducido o sin JavaScript se muestra la lista completa, estática y sin copia ni controles de movimiento.

Referencia: [Progressive Blur / with logos](https://21st.dev/@ibelick/components/progressive-blur/with-logos). Implementación propia en Astro/CSS con mejora progresiva para medir y pausar; no se instaló la dependencia Motion de la referencia.

## Mapa interactivo e indicaciones

El mapa sustituye el antiguo encuadre gris de Ubicación. El iframe usa `loading="lazy"`, espacio reservado desde el SSR y el título «Ubicación de Servielectric Ferreteria en Valledupar».

- Incrustación: `https://www.google.com/maps?q=10.4717158%2C-73.2443218&z=17&hl=es&output=embed`.
- Indicaciones: `https://www.google.com/maps/dir/?api=1&destination=10.4717158%2C-73.2443218`.

Ubicación va sobre azul con un degradado suave; el mapa es una tarjeta blanca con marco y sombra para separarlo del fondo, con una insignia amarilla de ubicación. «Cómo llegar» es un botón blanco y el WhatsApp lleva el número dentro.

Ambas URLs se construyen en `src/data/empresa.ts` desde el mismo destino. Los enlaces «Cómo llegar» son enlaces HTML independientes del iframe. En móvil, dirección y acciones aparecen antes del mapa (alto mínimo 20 rem para poder moverlo); desde tablet el mapa usa la proporción 3:2 de la foto del hero y, en escritorio, su borde exterior coincide con el de esa foto. Google Maps requiere conexión; los enlaces locales y la información comercial se renderizan sin depender de su carga.

## Diseño de pen.dev y recursos reales

Los cuatro originales se conservan sin modificar en `designe/`:

- `Landing Desktop 1440-export.html`.
- `Landing Movil 390-export.html`.
- `designe_servielectric_desktop.webp`.
- `designe_servielectric_movile.webp`.

Se usan como referencia de composición, no como páginas insertadas ni HTML fijo. Se mantiene una sola estructura para móvil y escritorio. La portada blanca y la escala Barlow/Inter, el bloque azul de soluciones y la paleta institucional se conservan en CSS propio.

La composición agrupa antetítulo, H1, separador, descripción y acciones en una columna izquierda, alineada al logo; la fotografía ocupa la derecha. La parte fija del H1 tiene un máximo de 62 px en escritorio para conservar una línea fija y otra variable. Las acciones comparten fila cuando hay espacio. Historia agrupa sus textos con un retrato menor al lado; Ubicación reúne título, dirección, teléfono y acciones antes del mapa. A menos de 896 px, cada bloque usa una columna; el menú sigue siendo compacto.

No se encontró un archivo del logo auténtico del rayo dentro del círculo: el símbolo del render es un placeholder. Se mantiene la marca tipográfica con el nombre corregido. Las fachadas incrustadas en los renders son inconsistentes y una muestra otro teléfono: no se utilizan.

Estado actual de las imágenes:

- Portada: marco neutro reservado para la fotografía que entregará la empresa (`public/images/portada.jpg`). La ilustración de la bobina azul ya no se muestra.
- Suministros: sin imágenes. La referencia de bobinas del bloque `Sol Foto` de pen.dev y los bocetos de luminarias, tablero y panel de red se conservan como archivos, pero no aparecen en la landing. La referencia puede regenerarse con `node scripts/extraer-bobinas.mjs`, sin modificar el original.
- Fundador: silueta neutra sin rasgos ni identidad, sin pie visible.
- Ubicación: mapa interactivo real de Google con el punto indicado, zoom 17 y calles cercanas.

La vista pública no muestra notas internas en pies de imagen («Referencia de pen.dev», «Boceto provisional», «Encuadre provisional»). Las imágenes se sustituyen desde `src/data/imagenes.ts`. Los bocetos anteriores de asesor y ubicación se conservan como archivos de iteraciones previas y no aparecen en la landing actual.

Recursos reales pendientes:

- Logo original utilizable (preferiblemente SVG).
- Fotografía del hero (`public/images/portada.jpg`) y su texto alternativo.
- Correo electrónico oficial (`empresa.correo`).
- Fotografías de las cuatro áreas (por ejemplo, de Instagram) en `public/images/suministros/`.
- Confirmar el teléfono: LinkedIn muestra 315 728 2309; la web usa el WhatsApp +57 315 060 5678.
- Fotografía auténtica de la esquina/fachada, si se desea complementar el mapa en otra iteración.
- Retrato aprobado del fundador.
- Textos oficiales de misión y visión.
- Confirmación de las marcas vigentes y archivos de logos aprobados; ver `docs/marcas-pendientes.md`.

La historia pública solo contiene el nombre del fundador y la información suministrada desde 1989. No se incorporó la anécdota del render ni tarjetas pendientes, horarios, clientes o proyectos.

Referencias conservadas: [ERCO Inspiration](https://www.erco.com/en/inspiration/) para fotografía en contexto y [Flos Architectural](https://professional.flos.com/en/global/catalogs/architectural/) para jerarquía de familias técnicas. No se copiaron imágenes ni se presentan como marcas asociadas.

## Skills aplicadas e instalación local

Se revisaron las skills disponibles. Se eligió **`frontend-design` de Anthropic** porque cubre las tres necesidades: dirección visual/tipografía, responsive accesible y autocrítica mediante capturas. Se aplicó su proceso de plan → revisión del brief → implementación → revisión visual. El plan está en `docs/direccion-visual.md`.

Se verificaron el listado en skills.sh, el repositorio oficial `anthropics/skills` y la revisión `41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f`, cuya firma aparece verificada en la API de GitHub. Se incorporó a `.opencode/skills/frontend-design/` mediante el mecanismo nativo de skills de esta instalación, con licencia Apache-2.0 y `SOURCE.md`. **Reiniciar OpenCode** permite descubrirla en futuras sesiones; en esta sesión se leyó y aplicó su contenido directamente.

`find-skills` se usó para la búsqueda y verificación; `customize-opencode` para confirmar el directorio local admitido. No se añadieron instalaciones globales, plugins ni dependencias npm. Playwright/Chromium ya formaban parte de la base.

En el hero actual se aplicó además la skill de entorno `animate`: movimiento ocasional de marketing para suavizar un cambio de estado, con transiciones CSS de opacidad/transform y cancelación bajo movimiento reducido. No fue necesario instalar otra skill ni librería en el proyecto.

En la iteración de ritmo y Suministros se volvió a aplicar `frontend-design` (ya presente en `.opencode/skills/`, sin instalar nada): plan sobre el brief, filas tipográficas en lugar de tarjetas o fotos de relleno, y autocrítica con capturas completas antes/después a 390, 768 y 1440 px.

## Comprobación manual

Revisar a 390, 768 y 1440 px; recorrer con Tab y Enter, incluido “Saltar al contenido”. Tras el salto, el primer control es «Cotizar por WhatsApp». Abrir el menú móvil, cerrarlo con Escape y elegir una sección. Mirar el titular dos vueltas, cambiar de pestaña o bajar hasta Ubicación y volver: debe esperar 3 s y seguir; con el puntero sobre el titular no cambia. Al bajar, el encabezado se vuelve translúcido y la barra amarilla avanza. En Suministros, tocar una fila despliega su información e ilustración; el botón amarillo del panel abre la consulta. El enlace principal y los cuatro específicos siguen disponibles; cotización se repite en encabezado, ubicación y pie (ocho enlaces de WhatsApp en total). Ambos enlaces “Cómo llegar” usan el mismo destino sin fijar el origen.

## Verificación automatizada en navegador

Después de `npm run build`:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH="$PWD\.cache\ms-playwright"
npx playwright install chromium
npm run test:e2e
```

Playwright inicia un preview de producción en `127.0.0.1:4322` y reutiliza el servidor de desarrollo de `localhost:4321` para la demostración de marcas. Astro 7 permite un solo servidor dev por proyecto: las pruebas no lo reemplazan ni cambian el puerto del túnel. Si no hay uno activo, el runner lo inicia. Los resultados temporales van a `.cache/playwright-results/` y las capturas actuales a `artifacts/ritmo-suministros/despues/`.

Comprueba HTTP 200, metadatos, anclas, los ocho destinos de WhatsApp y sus cinco mensajes distintos, ambos destinos de Maps; menú con teclado/toque; foco y salto al contenido; áreas táctiles de 44 × 44 px; contraste AA de nombres y líneas de las cuatro filas; fuentes locales; ausencia de errores locales HTTP/JavaScript y de desplazamiento horizontal. Incluye anchos 390/768/1440, cambio 895 → 896 → 768 px, movimiento reducido y fallback sin JavaScript. No envía mensajes ni navega los enlaces de cotización; la prueba del mapa sí carga el iframe externo real.

También verifica el nombre exacto en título, SEO y etiquetas de marca, y «Ferreteria» a 13 px o más; el margen compartido con el logo; la navegación centrada y Cotizar alineado con la foto; las acciones debajo de la descripción; la proporción del marco del hero sin petición a la foto pendiente; las cuatro filas reconocibles cerradas, con la línea a la derecha del nombre en escritorio; que la fila de «tableros» sea solo Media y baja tensión y que tocarla despliegue (no abra WhatsApp); que cada área se abra y cierre con toque, Enter y Espacio y muestre descripción, especialidades, imagen y su consulta; el encabezado fijo con la barra de lectura completa al final; el retrato junto al nombre en móvil; la ausencia de notas internas y de pies de imagen; y el pie (WhatsApp con el número dentro, sin números sueltos en la página, Instagram y LinkedIn, sin repetir la dirección y enlaces sin solaparse).

Las pruebas del hero verifican los 3000 ms de lectura, los 500 ms de transición también en la compilación minificada, dos vueltas completas y el cambio siguiente, el nombre accesible estable, el contraste cobre/blanco y el espacio de descendentes. Comprueban también la pausa con la pestaña oculta y con la portada fuera de pantalla (en tiempo real), la ausencia de cambios extra tras alternancias rápidas, la pausa con el puntero sobre el titular (incluida a mitad de transición), la ausencia de botones de pausa y la cancelación con movimiento reducido. Las de marcas miden la velocidad real, la pausa al pasar el puntero, extremos inmóviles, lista estática, ausencia de overflow y exclusión de datos sin confirmar en producción. La prueba del mapa carga el iframe real y registra el resultado externo.

### Grabar el movimiento

Con `npm run dev` activo en 4321:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH="$PWD\.cache\ms-playwright"
npm run record:motion
```

Guarda `artifacts/hero-marcas/hero-1440.webm` (la primera vuelta; el ciclo continúa después) y `marcas-1440.webm` (desplazamiento, pausa con el puntero y reanudación), a velocidad real. Se usaron las herramientas de vídeo de Playwright ya disponibles, sin añadir dependencias. También se extrajeron fotogramas para revisar la transición y el desenfoque central/lateral.

### Resultado de la entrega (Suministros desplegables, encabezado fijo, Ubicación y pie)

- `npm run check`: 0 errores, 0 advertencias, 0 sugerencias.
- `npm run build`: una página estática generada en `dist/`.
- `npm run test:e2e`: 19 pruebas aprobadas entre preview de producción y desarrollo.
- Revisado a 390, 768 y 1440 px: apertura de las cuatro áreas con sus ilustraciones (fotogramas intermedios y finales), encabezado translúcido con barra de lectura, menú móvil sobre la página, Ubicación y pie. Sin desplazamiento horizontal ni errores de JavaScript.
- Comparación con la iteración anterior en `artifacts/suministros-interactivo/comparacion-*.png`.
- El servidor de desarrollo sigue en `http://localhost:4321/` para el túnel de VS Code.
- Pendiente: fotos reales de las áreas y del hero, correo oficial y logo en SVG/PNG. Instagram no se pudo consultar sin sesión; LinkedIn sí (contenido público). No se revisó en Safari/Firefox ni en dispositivos físicos.
