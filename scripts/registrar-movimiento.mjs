import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const url = process.env.REVIEW_URL ?? 'http://localhost:4321/';
const salida = (nombre) => fileURLToPath(new URL(`../artifacts/hero-marcas/${nombre}`, import.meta.url));
const temporales = fileURLToPath(new URL('../.cache/grabaciones', import.meta.url));
const browser = await chromium.launch();

try {
  for (const seccion of ['hero', 'marcas']) {
    const viewport = { width: 1440, height: seccion === 'hero' ? 900 : 540 };
    const contexto = await browser.newContext({ viewport, reducedMotion: 'no-preference', recordVideo: { dir: temporales, size: viewport } });
    const page = await contexto.newPage();
    const video = page.video();
    await page.goto(url);
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
    await page.evaluate(() => document.fonts.ready);
    if (seccion === 'hero') {
      // Espera deliberada para grabar una vuelta completa a velocidad real.
      await page.waitForTimeout(11500);
      if ((await page.locator('.hero-phrase.is-active').textContent()) !== 'obra.') throw new Error('El hero no terminó en obra.');
    } else {
      await page.locator('#marcas').evaluate((element) => element.scrollIntoView({ block: 'center' }));
      await page.waitForFunction(() => document.querySelector('#marcas')?.getAttribute('data-motion') === 'running');
      await page.waitForTimeout(4500);
      // Sin botón de pausa: el puntero sobre la franja la detiene y al salir continúa.
      await page.locator('.brands-viewport').hover();
      await page.waitForTimeout(2000);
      await page.mouse.move(4, 4);
      await page.waitForTimeout(4500);
    }
    await contexto.close();
    await video.saveAs(salida(`${seccion}-1440.webm`));
    console.log(`Grabación real guardada: ${salida(`${seccion}-1440.webm`)}`);
  }
} finally {
  await browser.close();
}
