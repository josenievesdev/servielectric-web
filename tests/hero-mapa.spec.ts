import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { existsSync } from 'node:fs';

const capturas = 'artifacts/ritmo-suministros/despues';
const fotoHero = existsSync('public/images/portada.jpg');

async function posiciones(page: Page) {
  return page.locator('.hero-prefix, .hero-rule, .hero-pause, .hero-copy, .hero-actions, .hero-image').evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { x: box.x, y: box.y + scrollY, width: box.width, height: box.height };
  }));
}

async function sinDesbordamiento(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('.hero-phrase').nth(1).evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return range.getBoundingClientRect().width <= element.getBoundingClientRect().width;
  })).toBe(true);
}

const activa = (page: Page) => page.locator('.hero-phrase.is-active');

async function visibilidad(page: Page, estado: 'hidden' | 'visible') {
  await page.evaluate((valor) => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => valor });
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => valor === 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
  }, estado);
}

for (const width of [390, 768, 1440]) {
  test(`ciclo continuo de dos vueltas y CTA estable a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.clock.install({ time: new Date('2026-11-15T12:00:00Z') });
    await page.clock.pauseAt(new Date('2026-11-15T12:00:01Z'));
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(activa(page)).toHaveText('obra.');
    await expect(page.locator('.hero-prefix')).toHaveText('para tu');
    await expect(page.locator('#inicio a[href^="https://wa.me/"]')).toBeVisible();
    await expect(page.locator('.hero-image figcaption')).toHaveCount(0);
    if (!fotoHero) await expect(page.locator('.hero-image')).toHaveClass(/is-pending/);
    await expect(page.locator('.hero-image .media-frame')).toBeVisible();
    const inicial = await posiciones(page);
    await sinDesbordamiento(page);

    await page.clock.runFor(2999);
    await expect(activa(page)).toHaveText('obra.');
    await page.clock.runFor(1);
    await expect(page.locator('.hero-phrase.is-leaving')).toHaveText('obra.');
    await expect(activa(page)).toHaveText('negocio.');
    // La salida dura 500 ms también en la compilación minificada («.5s»), no 0,5 ms.
    await page.clock.runFor(499);
    await expect(page.locator('.hero-phrase.is-leaving')).toHaveText('obra.');
    await page.clock.runFor(1);
    await expect(page.locator('.hero-phrase.is-leaving')).toHaveCount(0);
    await expect(activa(page)).toHaveCSS('opacity', '1');
    await expect(page.locator('h1')).toHaveAccessibleName('Materiales eléctricos para tu obra.');
    expect(await posiciones(page)).toEqual(inicial);
    await sinDesbordamiento(page);
    const ventana = await page.locator('.hero-word-window').boundingBox();
    const palabra = await activa(page).boundingBox();
    expect(ventana!.y + ventana!.height - palabra!.y - palabra!.height).toBeGreaterThan(8);
    await expect(page.locator('.hero-prefix')).toHaveCSS('color', 'rgb(1, 23, 125)');
    await expect(activa(page)).toHaveCSS('color', 'rgb(145, 74, 39)');
    const luminancia = (canales: number[]) => canales.map((canal) => canal / 255).map((canal) => canal <= 0.04045 ? canal / 12.92 : ((canal + 0.055) / 1.055) ** 2.4).reduce((total, canal, i) => total + canal * [0.2126, 0.7152, 0.0722][i]!, 0);
    expect(1.05 / (luminancia([145, 74, 39]) + 0.05)).toBeGreaterThanOrEqual(4.5);
    await page.locator('#inicio').screenshot({ path: `${capturas}/hero-negocio-${width}.png`, animations: 'disabled' });

    // Resto de la primera vuelta y una segunda completa: obra → negocio → hogar → obra → negocio → hogar → obra.
    for (const siguiente of ['hogar.', 'obra.', 'negocio.', 'hogar.', 'obra.']) {
      await page.clock.runFor(2999);
      await expect(activa(page)).not.toHaveText(siguiente);
      await page.clock.runFor(1);
      await expect(activa(page)).toHaveText(siguiente);
      await page.clock.runFor(500);
      await expect(page.locator('.hero-phrase.is-leaving')).toHaveCount(0);
      expect(await posiciones(page)).toEqual(inicial);
    }
    // Y sigue: no se detiene al volver a «obra.».
    await page.clock.runFor(3000);
    await expect(activa(page)).toHaveText('negocio.');
  });
}

test('pestaña oculta y pausa manual sin temporizadores duplicados', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.clock.install({ time: new Date('2026-11-15T12:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-15T12:00:01Z'));
  await page.goto('/');
  const pausa = page.getByRole('button', { name: 'Pausar animación del titular', exact: true });
  await expect(pausa).toBeVisible();
  await page.clock.runFor(3600);
  await expect(activa(page)).toHaveText('negocio.');

  await visibilidad(page, 'hidden');
  await page.clock.runFor(20000);
  await expect(activa(page)).toHaveText('negocio.');
  // Alternancias rápidas de pestaña: con temporizadores duplicados aparecerían cambios extra.
  for (let i = 0; i < 5; i += 1) {
    await visibilidad(page, 'visible');
    await page.clock.runFor(200);
    await visibilidad(page, 'hidden');
    await page.clock.runFor(200);
  }
  await visibilidad(page, 'visible');
  await page.clock.runFor(2999);
  await expect(activa(page)).toHaveText('negocio.');
  await page.clock.runFor(1);
  await expect(activa(page)).toHaveText('hogar.');
  await page.evaluate(() => {
    const ventana = window as unknown as { cambios: number };
    ventana.cambios = 0;
    new MutationObserver((registros) => { ventana.cambios += registros.filter((r) => (r.target as Element).classList.contains('is-leaving')).length; })
      .observe(document.querySelector('[data-hero-rotation]')!, { subtree: true, attributes: true, attributeFilter: ['class'] });
  });
  await page.clock.runFor(500 + 3500 * 10 - 1);
  expect(await page.evaluate(() => (window as unknown as { cambios: number }).cambios)).toBe(10);

  // La pausa manual se respeta aunque la pestaña se oculte y vuelva.
  await page.clock.runFor(600);
  await pausa.press('Enter');
  const reanudar = page.getByRole('button', { name: 'Reanudar animación del titular', exact: true });
  await expect(reanudar).toBeFocused();
  const quieta = await activa(page).textContent();
  await visibilidad(page, 'hidden');
  await page.clock.runFor(1000);
  await visibilidad(page, 'visible');
  await page.clock.runFor(20000);
  await expect(activa(page)).toHaveText(quieta!);
  await reanudar.press('Space');
  await expect(pausa).toBeFocused();
  await page.clock.runFor(2999);
  await expect(activa(page)).toHaveText(quieta!);
  await page.clock.runFor(1);
  await expect(activa(page)).not.toHaveText(quieta!);
  // Pausa a mitad de transición: el gesto termina y no se programa otro cambio.
  await page.clock.runFor(3500 + 200);
  await expect(page.locator('.hero-phrase.is-leaving')).toHaveCount(1);
  await pausa.click();
  await page.clock.runFor(600);
  await expect(page.locator('.hero-phrase.is-leaving')).toHaveCount(0);
  const final = await activa(page).textContent();
  await page.clock.runFor(15000);
  await expect(activa(page)).toHaveText(final!);
});

test('salir del hero pausa y volver reanuda, en tiempo real', async ({ page }) => {
  test.setTimeout(45000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(activa(page)).toHaveText('negocio.', { timeout: 5000 });
  await page.waitForTimeout(700);
  await page.locator('#ubicacion').scrollIntoViewIfNeeded();
  const fuera = await activa(page).textContent();
  // Espera real deliberada: más de dos cambios si el ciclo siguiera activo fuera de pantalla.
  await page.waitForTimeout(8000);
  await expect(activa(page)).toHaveText(fuera!);
  await expect(page.locator('.hero-phrase.is-leaving')).toHaveCount(0);
  await page.evaluate(() => scrollTo(0, 0));
  const inicio = Date.now();
  await expect(activa(page)).not.toHaveText(fuera!, { timeout: 6000 });
  const espera = Date.now() - inicio;
  expect(espera).toBeGreaterThan(2500);
  expect(espera).toBeLessThan(4000);
});

test('movimiento reducido estático y cancelación de una secuencia en curso', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-11-15T12:00:00Z') });
  await page.clock.pauseAt(new Date('2026-11-15T12:00:01Z'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.clock.runFor(15000);
  await expect(activa(page)).toHaveText('obra.');
  await expect(activa(page)).toHaveCSS('transform', 'none');
  await expect(activa(page)).toHaveCSS('transition-duration', '0s');
  await expect(page.locator('[data-hero-pause]')).toBeHidden();

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  await page.clock.runFor(3550);
  await expect(activa(page)).toHaveText('negocio.');
  // El evento de cambio de preferencia llega con el siguiente fotograma: aquí el reloj vuelve a correr en tiempo real.
  await page.clock.resume();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(activa(page)).toHaveText('obra.');
  await expect(page.locator('[data-hero-pause]')).toBeHidden();
  // Espera real deliberada: con el ciclo activo habría al menos un cambio en 4 s.
  await page.waitForTimeout(4000);
  await expect(activa(page)).toHaveText('obra.');
  await expect(page.locator('.hero-phrase.is-leaving')).toHaveCount(0);
});

test('carga real del iframe y capturas de hero y ubicación', async ({ browser }, testInfo) => {
  test.setTimeout(90000);
  const resultados: object[] = [];
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const respuestas: { url: string; estado: number }[] = [];
    const fallos: string[] = [];
    page.on('response', (response) => {
      if (response.request().isNavigationRequest() && response.url().startsWith('https://www.google.com/maps')) {
        respuestas.push({ url: response.url(), estado: response.status() });
      }
    });
    page.on('requestfailed', (request) => {
      if (request.url().includes('google') || request.url().includes('gstatic')) fallos.push(`${request.failure()?.errorText}: ${request.url()}`);
    });
    await page.goto('http://127.0.0.1:4322/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.hero-image .media-frame')).toBeVisible();
    await page.locator('#inicio').screenshot({ path: `${capturas}/hero-${width}.png`, animations: 'disabled' });
    const mapa = page.locator('.location-map iframe');
    await mapa.scrollIntoViewIfNeeded();
    await expect(mapa).toBeVisible();
    await expect(mapa).toHaveAttribute('src', 'https://www.google.com/maps?q=10.4717158%2C-73.2443218&z=17&hl=es&output=embed');
    let contenido = '';
    try {
      const handle = await mapa.elementHandle();
      const frame = await handle?.contentFrame();
      if (frame) {
        await frame.waitForURL(/google\.com\/maps/, { timeout: 15000 });
        await frame.waitForLoadState('load', { timeout: 15000 });
        await frame.locator('.gm-style').first().waitFor({ state: 'visible', timeout: 15000 });
        await frame.waitForFunction(() => document.body.innerText.includes('Google') || document.body.innerText.includes('Datos del mapa'), undefined, { timeout: 15000 });
        await frame.waitForFunction(() => Array.from(document.images).filter((imagen) => imagen.currentSrc.includes('google')).every((imagen) => imagen.complete), undefined, { timeout: 10000 });
        contenido = await frame.locator('body').innerText({ timeout: 5000 });
      }
    } catch (error) {
      contenido = error instanceof Error ? error.message : String(error);
    }
    // Se registra el resultado externo sin simular el mapa ni confundir un bloqueo de red con un fallo de la página.
    const resultado = { ancho: width, respuestas, fallos, contenido };
    resultados.push(resultado);
    console.log(`Mapa ${width}px: ${JSON.stringify(resultado)}`);
    await page.locator('#ubicacion').screenshot({ path: `${capturas}/ubicacion-${width}.png`, animations: 'disabled' });
    await mapa.focus();
    await expect(mapa).toBeFocused();
    await sinDesbordamiento(page);
    await expect(page.locator('#ubicacion').getByRole('link', { name: 'Cómo llegar', exact: true })).toHaveAttribute('href', 'https://www.google.com/maps/dir/?api=1&destination=10.4717158%2C-73.2443218');
    await page.close();
  }
  await testInfo.attach('carga-real-de-google-maps', { body: JSON.stringify(resultados, null, 2), contentType: 'application/json' });
});
