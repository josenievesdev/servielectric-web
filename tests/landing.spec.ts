import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { existsSync } from 'node:fs';
import { perfilesOficiales } from '../src/data/empresa';

const titulos = ['Media y baja tensión', 'Iluminación', 'Automatización y control', 'Redes y comunicaciones'];
const mensajes = [
  'Hola, quisiera cotizar una lista de materiales eléctricos',
  'Hola, quisiera cotizar materiales de media y baja tensión',
  'Hola, necesito asesoría para cotizar iluminación',
  'Hola, quisiera consultar sobre automatización y control',
  'Hola, quisiera cotizar materiales para redes y comunicaciones',
];
const whatsappUrl = (mensaje: string) => `https://wa.me/573150605678?text=${encodeURIComponent(mensaje)}`;
const fotoHero = existsSync('public/images/portada.jpg');
const capturas = 'artifacts/ritmo-suministros/despues';

async function sinDesbordamiento(page: Page) {
  expect(await page.evaluate(() => ({ ancho: innerWidth, contenido: document.documentElement.scrollWidth })))
    .toEqual({ ancho: page.viewportSize()!.width, contenido: page.viewportSize()!.width });
}

async function contrasteFilas(page: Page) {
  const contrastes = await page.locator('.solution h3, .solution-summary').evaluateAll((elementos) => {
    const luminancia = (color: string) => {
      const canales = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map((value) => {
        const s = value / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return canales[0]! * 0.2126 + canales[1]! * 0.7152 + canales[2]! * 0.0722;
    };
    return elementos.map((elemento) => {
      const fondo = luminancia(getComputedStyle(elemento.closest('section')!).backgroundColor);
      const texto = luminancia(getComputedStyle(elemento).color);
      return (Math.max(fondo, texto) + 0.05) / (Math.min(fondo, texto) + 0.05);
    });
  });
  expect(contrastes).toHaveLength(8);
  for (const contraste of contrastes) expect(contraste).toBeGreaterThanOrEqual(4.5);
}

async function caja(page: Page, selector: string) {
  return page.locator(selector).first().evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y + scrollY, ancho: rect.width, alto: rect.height, derecha: rect.right, abajo: rect.bottom + scrollY };
  });
}

async function comprobarComposicion(page: Page, width: number) {
  const marca = await caja(page, '.site-header .brand');
  const titulo = await caja(page, 'h1');
  const texto = await caja(page, '.hero-copy');
  const acciones = await caja(page, '.hero-actions');
  const foto = await caja(page, '.hero-image .media-frame');
  const tituloSoluciones = await caja(page, '#titulo-soluciones');
  const lista = await caja(page, '.solutions-list');
  const retrato = await caja(page, '.history-portrait .media-frame');
  const ubicacion = await caja(page, '.location-content');
  const fotoUbicacion = await caja(page, '.location-map');

  for (const bloque of [titulo, texto, acciones, tituloSoluciones, lista, ubicacion]) {
    expect(bloque.x).toBeCloseTo(marca.x, 1);
  }
  expect(texto.y).toBeGreaterThan(titulo.abajo);
  expect(acciones.y).toBeGreaterThanOrEqual(texto.abajo);
  expect(lista.y).toBeGreaterThan(tituloSoluciones.abajo);
  expect(retrato.ancho).toBeLessThan(foto.ancho);
  expect(retrato.alto).toBeLessThan(foto.alto);
  // El marco de la foto del hero conserva su proporción (3:2; 5:2 en tablet) aunque falte la imagen.
  const proporcion = width >= 640 && width < 896 ? 5 / 2 : 3 / 2;
  expect(foto.ancho / foto.alto).toBeCloseTo(proporcion, 1);

  const filas = await page.locator('.solution').evaluateAll((elementos) => elementos.map((fila) => {
    const rect = (selector: string) => fila.querySelector(selector)!.getBoundingClientRect();
    const [nombre, resumen, enlace] = [rect('h3'), rect('.solution-summary'), rect('.solution-link')];
    return { nombre: { x: nombre.x, derecha: nombre.right, y: nombre.y, abajo: nombre.bottom }, resumen: { x: resumen.x, derecha: resumen.right, y: resumen.y }, enlace: { x: enlace.x, derecha: enlace.right }, fila: fila.getBoundingClientRect().height };
  }));
  for (const fila of filas) {
    expect(fila.enlace.x).toBeGreaterThan(fila.resumen.derecha - 1);
    expect(fila.fila).toBeLessThan(width >= 896 ? 120 : 170);
    if (width >= 896) expect(fila.resumen.x).toBeGreaterThan(fila.nombre.derecha);
    else expect(fila.resumen.y).toBeGreaterThanOrEqual(fila.nombre.abajo - 1);
  }

  if (width >= 896) {
    expect(foto.x).toBeGreaterThan(acciones.derecha);
    expect(foto.ancho).toBeGreaterThan((await caja(page, '.hero-composition')).ancho * 0.45);
    expect(fotoUbicacion.x).toBeGreaterThan(ubicacion.derecha);
    expect(fotoUbicacion.derecha).toBeCloseTo(foto.derecha, 1);
    const principal = await caja(page, '.hero-actions .button');
    const secundaria = await caja(page, '.hero-actions .direction-link');
    expect(principal.y + principal.alto / 2).toBeCloseTo(secundaria.y + secundaria.alto / 2, 1);
    expect(await page.locator('h1').evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeLessThanOrEqual(62);
    expect(await page.locator('.hero-heading-fixed').evaluate((element) => element.getBoundingClientRect().height <= parseFloat(getComputedStyle(element).lineHeight) + 1)).toBe(true);
    // Encabezado: navegación centrada en la página y Cotizar alineado al borde derecho del contenido.
    const cabecera = await caja(page, '.header-inner');
    const enlaces = await caja(page, '.nav-links');
    const cotizar = await caja(page, '.nav-cta');
    expect(Math.abs(enlaces.x + enlaces.ancho / 2 - (cabecera.x + cabecera.ancho / 2))).toBeLessThanOrEqual(2);
    expect(cotizar.derecha).toBeCloseTo(cabecera.derecha, 1);
    expect(cotizar.derecha).toBeCloseTo(foto.derecha, 1);
  } else {
    expect(foto.y).toBeGreaterThanOrEqual(acciones.abajo);
    expect(fotoUbicacion.y).toBeGreaterThan(ubicacion.abajo);
    // En móvil el retrato acompaña al nombre del fundador en lugar de ocupar una pantalla propia.
    const nombre = await caja(page, '.history h3');
    expect(retrato.alto).toBeLessThanOrEqual(120);
    expect(nombre.x).toBeGreaterThan(retrato.derecha);
    expect(retrato.y).toBeLessThan(nombre.abajo);
  }
}

test('portada estática, metadatos y destinos comerciales', async ({ page }) => {
  const peticiones: string[] = [];
  page.on('request', (request) => peticiones.push(request.url()));
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-CO');
  await expect(page).toHaveTitle('Materiales eléctricos en Valledupar | Servielectric Ferreteria');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Materiales eléctricos/);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveAccessibleName('Materiales eléctricos para tu obra.');
  await expect(page.locator('.hero-heading-fixed')).toHaveText('Materiales eléctricos');
  await expect(page.locator('.hero-kicker')).toHaveText('Valledupar · Desde 1989');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Servielectric Ferreteria/);
  await expect(page.locator('.brand')).toHaveCount(2);
  for (const marca of await page.locator('.brand').all()) {
    await expect(marca).toHaveAttribute('aria-label', 'Servielectric Ferreteria, inicio');
    await expect(marca.locator('.brand-name')).toHaveText('Servielectric');
    await expect(marca.locator('.brand-caption')).toHaveText('Ferreteria');
    await expect(marca.locator('.brand-caption')).toHaveCSS('text-transform', 'uppercase');
    expect(await marca.locator('.brand-caption').evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(13);
  }
  await expect(page.locator('body')).not.toContainText(/Servielectric Ferretería|Ferretería eléctrica|Selecciona un área/);

  const anchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.map((link) => ({ href: link.getAttribute('href')!, exists: !!document.getElementById(link.getAttribute('href')!.slice(1)) })),
  );
  expect(anchors.length).toBeGreaterThan(0);
  for (const anchor of anchors) expect(anchor.exists, anchor.href).toBe(true);

  await expect(page.locator('#inicio .hero-copy')).toHaveText('¿Tienes una lista de materiales? Envíanosla y te ayudamos a cotizar');
  expect((await page.locator('#inicio').innerText()).match(/Desde 1989/g)).toHaveLength(1);
  // Encabezado, portada, cuatro áreas, ubicación y pie.
  const whatsapp = await page.locator('a[href^="https://wa.me/"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(whatsapp).toEqual([mensajes[0]!, ...mensajes, mensajes[0]!, mensajes[0]!].map(whatsappUrl));
  await expect(page.locator('#soluciones a')).toHaveCount(4);
  await expect(page.locator('#inicio a[href^="https://wa.me/"]')).toHaveAttribute('href', whatsappUrl(mensajes[0]!));

  // Foto del hero pendiente: marco neutro sin petición rota; con el archivo, imagen real.
  await expect(page.locator('.hero-image img')).toHaveCount(fotoHero ? 1 : 0);
  if (!fotoHero) {
    await expect(page.locator('.hero-image')).toHaveClass(/is-pending/);
    expect(peticiones.some((url) => url.includes('/images/portada'))).toBe(false);
  }
  await expect(page.locator('img[src*="bobina-azul"]')).toHaveCount(0);

  const maps = await page.getByRole('link', { name: 'Cómo llegar', exact: true }).evaluateAll((links) => links.map((link) => link.getAttribute('href')!));
  expect(maps).toHaveLength(2);
  for (const href of maps) {
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/dir/');
    expect(url.searchParams.get('api')).toBe('1');
    expect(url.searchParams.get('destination')).toBe('10.4717158,-73.2443218');
    expect(url.searchParams.has('origin')).toBe(false);
  }
  await expect(page.locator('address')).toHaveText('Calle 19 # 8-46, Valledupar, Cesar.');
  await expect(page.locator('iframe')).toHaveCount(1);
  const mapa = page.locator('.location-map iframe');
  await expect(mapa).toHaveAttribute('title', 'Ubicación de Servielectric Ferreteria en Valledupar');
  await expect(mapa).toHaveAttribute('loading', 'lazy');
  const urlMapa = new URL((await mapa.getAttribute('src'))!);
  expect(urlMapa.origin + urlMapa.pathname).toBe('https://www.google.com/maps');
  expect(urlMapa.searchParams.get('q')).toBe('10.4717158,-73.2443218');
  expect(urlMapa.searchParams.get('output')).toBe('embed');
  expect(urlMapa.searchParams.get('z')).toBe('17');
  // Sin notas internas en la vista pública.
  await expect(page.locator('body')).not.toContainText(/pendiente|reemplazar|anécdota|misión|visión|pen\.dev|provisional|por incorporar|boceto/i);
  await expect(page.locator('figcaption')).toHaveCount(0);
  await expect(page.locator('h3', { hasText: 'Adrián Nieves Ibarra' })).toBeVisible();

  // Pie: número de ventas útil, perfiles oficiales solo con URL confirmada y volver al inicio.
  const pie = page.locator('footer');
  const telefono = pie.getByRole('link', { name: 'Escribir a ventas por WhatsApp: +57 315 060 5678', exact: true });
  await expect(telefono).toHaveAttribute('href', whatsappUrl(mensajes[0]!));
  await expect(telefono).toHaveText('+57 315 060 5678');
  const perfiles = perfilesOficiales.filter((perfil) => perfil.url.trim() !== '');
  const enlacesPerfiles = pie.locator('.footer-social a');
  await expect(enlacesPerfiles).toHaveCount(perfiles.length);
  for (const [index, perfil] of perfiles.entries()) {
    await expect(enlacesPerfiles.nth(index)).toHaveAttribute('href', perfil.url);
    await expect(enlacesPerfiles.nth(index)).toHaveAccessibleName(perfil.red);
  }
  await expect(pie.getByRole('link', { name: 'Volver al inicio', exact: true })).toHaveAttribute('href', '#inicio');
  await expect(pie).not.toContainText('Calle 19');
});

for (const width of [390, 768, 1440]) {
  test(`responsive, menú y cuatro consultas de suministros a ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 896 });
    const page = await context.newPage();
    const errores: string[] = [];
    page.on('pageerror', (error) => errores.push(error.message));
    page.on('response', (response) => {
      if (response.url().startsWith('http://127.0.0.1:4322/') && response.status() >= 400) errores.push(`${response.status()}: ${response.url()}`);
    });
    await page.goto('http://127.0.0.1:4322/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.fonts.check('700 32px Barlow') && document.fonts.check('600 13px Barlow') && document.fonts.check('400 16px Inter'))).toBe(true);
    await sinDesbordamiento(page);
    await contrasteFilas(page);
    // Carga también las imágenes lazy fuera de la primera pantalla antes de capturar.
    for (const imagen of await page.locator('img:visible').all()) {
      await imagen.scrollIntoViewIfNeeded();
      await expect.poll(() => imagen.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    await comprobarComposicion(page, width);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `${capturas}/produccion-${width}.png`, fullPage: true, animations: 'disabled' });

    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Pausar animación del titular', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#inicio').getByRole('link', { name: 'Cotizar por WhatsApp', exact: true })).toBeFocused();
    const focus = await page.locator(':focus').evaluate((element) => {
      const style = getComputedStyle(element);
      return { style: style.outlineStyle, width: style.outlineWidth };
    });
    expect(focus.style).toBe('solid');
    expect(focus.width).toBe('3px');
    for (const control of await page.locator('a:visible, button:visible').all()) {
      const box = await control.boundingBox();
      expect(box?.height, (await control.textContent()) ?? 'Control interactivo').toBeGreaterThanOrEqual(44);
      expect(box?.width, (await control.textContent()) ?? 'Control interactivo').toBeGreaterThanOrEqual(44);
    }

    const toggle = page.getByRole('button', { name: 'Menú', exact: true });
    const suministros = page.getByRole('link', { name: 'Suministros', exact: true });
    if (width < 896) {
      await expect(toggle).toBeVisible();
      await expect(page.getByRole('navigation')).toBeHidden();
      await toggle.tap();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(suministros).toBeVisible();
      await expect(page.getByRole('navigation').getByRole('link', { name: 'Cotizar', exact: true })).toBeVisible();
      await sinDesbordamiento(page);
      if (width === 390) await page.screenshot({ path: `${capturas}/menu-390.png`, animations: 'disabled' });
      await page.keyboard.press('Escape');
      await expect(toggle).toBeFocused();
      await expect(page.getByRole('navigation')).toBeHidden();
      await toggle.press('Space');
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await toggle.press('Enter');
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await toggle.press('Enter');
      await page.keyboard.press('Tab');
      await expect(suministros).toBeFocused();
      await suministros.press('Enter');
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(page.getByRole('navigation')).toBeHidden();
      await expect(page.locator('#soluciones')).toBeFocused();
    } else {
      await expect(toggle).toBeHidden();
      await expect(suministros).toBeVisible();
      await suministros.focus();
      await suministros.press('Enter');
    }
    await expect(page).toHaveURL(/#soluciones$/);
    await expect(page.getByRole('heading', { name: 'Suministros y servicios eléctricos' })).toBeInViewport();

    // Las cuatro áreas se leen sin abrir nada: nombre, línea breve y su consulta con el mensaje correcto.
    await expect(page.locator('.solution')).toHaveCount(4);
    for (const [index, titulo] of titulos.entries()) {
      const area = page.locator('.solution').nth(index);
      await expect(area.getByRole('heading', { level: 3 })).toHaveText(titulo);
      await expect(area.locator('.solution-summary')).toBeVisible();
      const enlace = area.getByRole('link', { name: `Consultar por WhatsApp: ${titulo}`, exact: true });
      await expect(enlace).toBeVisible();
      await expect(enlace).toHaveAttribute('href', whatsappUrl(mensajes[index + 1]!));
    }
    // Quien busca un tablero lo encuentra en una sola fila y toca cualquier punto de ella para abrir su consulta.
    const fila = page.locator('.solution', { hasText: /tableros/i });
    await expect(fila).toHaveCount(1);
    await expect(fila.getByRole('heading', { level: 3 })).toHaveText('Media y baja tensión');
    await expect(fila).toBeInViewport();
    const destino = await fila.locator('.solution-summary').evaluate((resumen) => {
      const rect = resumen.getBoundingClientRect();
      return document.elementFromPoint(rect.x + 8, rect.y + rect.height / 2)?.closest('a')?.getAttribute('href');
    });
    expect(destino).toBe(whatsappUrl(mensajes[1]!));
    await page.keyboard.press('Tab');
    await expect(fila.getByRole('link')).toBeFocused();
    expect(await fila.getByRole('link').evaluate((enlace) => getComputedStyle(enlace, '::after').outlineStyle)).toBe('solid');
    if (width === 390) await fila.screenshot({ path: `${capturas}/fila-tableros-390.png` });

    // Pie: enlaces visibles y separados lo suficiente para el toque.
    const enlacesPie = await page.locator('footer a').evaluateAll((enlaces) => enlaces.map((enlace) => enlace.getBoundingClientRect()).map((r) => ({ y: r.y + scrollY, abajo: r.bottom + scrollY, x: r.x, derecha: r.right })));
    for (const [i, a] of enlacesPie.entries()) {
      for (const b of enlacesPie.slice(i + 1)) {
        const solapan = a.x < b.derecha && b.x < a.derecha && a.y < b.abajo && b.y < a.abajo;
        expect(solapan).toBe(false);
      }
    }
    await sinDesbordamiento(page);
    expect(errores).toEqual([]);
    await context.close();
  });
}

test('salto entre móvil y escritorio, cierre exterior y movimiento reducido', async ({ page }) => {
  await page.setViewportSize({ width: 895, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menú', exact: true });
  await toggle.click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.locator('h1').click();
  await expect(page.getByRole('navigation')).toBeHidden();
  await toggle.click();
  await page.getByRole('link', { name: 'Suministros', exact: true }).focus();
  await page.setViewportSize({ width: 896, height: 900 });
  await expect(toggle).toBeHidden();
  await expect(page.getByRole('navigation')).toBeVisible();
  await sinDesbordamiento(page);
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(page.getByRole('navigation')).toBeHidden();
  await expect(toggle).toBeFocused();
  await sinDesbordamiento(page);
  await expect(page.getByRole('button', { name: 'Pausar animación del titular', exact: true })).toBeHidden();
  expect(await page.locator('.solution h3').first().evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0s');
  expect(await page.locator('.menu-icon span').first().evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0s');
});

test('anclas y consultas conservan funcionalidad sin JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await expect(page.locator('h1')).toHaveAccessibleName('Materiales eléctricos para tu obra.');
  await expect(page.locator('.hero-phrase.is-active')).toHaveText('obra.');
  await expect(page.locator('.hero-phrase.is-active')).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-hero-pause]')).toBeHidden();
  await expect(page.locator('#inicio a[href^="https://wa.me/"]')).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Menú', exact: true })).toBeHidden();
  await page.getByRole('link', { name: 'Suministros', exact: true }).click();
  await expect(page).toHaveURL(/#soluciones$/);
  for (const [index, titulo] of titulos.entries()) {
    await expect(page.getByRole('link', { name: `Consultar por WhatsApp: ${titulo}`, exact: true })).toHaveAttribute('href', whatsappUrl(mensajes[index + 1]!));
  }
  await sinDesbordamiento(page);
  await context.close();
});
