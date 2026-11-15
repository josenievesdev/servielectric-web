import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.use({ baseURL: 'http://localhost:4321' });

async function muestra(page: Page) {
  return page.locator('.brands-track').evaluate((element) => {
    const animacion = element.getAnimations()[0]!;
    return { x: new DOMMatrix(getComputedStyle(element).transform).m41, tiempo: Number(animacion.currentTime) };
  });
}

for (const width of [390, 768, 1440]) {
  test(`franja de desarrollo, velocidad, pausa y extremos fijos a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
    const franja = page.locator('#marcas');
    await expect(franja).toHaveAttribute('data-demo', 'true');
    const secciones = await page.locator('main > section').evaluateAll((elements) => elements.map((element) => element.id));
    expect(secciones.slice(secciones.indexOf('soluciones'), secciones.indexOf('soluciones') + 3)).toEqual(['soluciones', 'marcas', 'historia']);
    await expect(franja).not.toContainText(/\b(?:3M|Philips|Sylvania)\b/);
    await franja.scrollIntoViewIfNeeded();
    await expect(franja).toHaveAttribute('data-motion', 'running');
    await expect(franja).toHaveAttribute('data-visible', 'true');
    await expect(franja.getByRole('list')).toHaveCount(1);
    await expect(page.locator('.brands-copy')).toHaveAttribute('aria-hidden', 'true');
    const bordes = await page.locator('.brands-edge').evaluateAll((elements) => elements.map((element) => ({ x: element.getBoundingClientRect().x, width: element.getBoundingClientRect().width })));
    const primera = await muestra(page);
    // Muestreo real de la velocidad CSS: se busca 24 px/s, no una duración prefijada.
    await page.waitForTimeout(650);
    const segunda = await muestra(page);
    const velocidad = (primera.x - segunda.x) / ((segunda.tiempo - primera.tiempo) / 1000);
    expect(velocidad).toBeGreaterThan(23);
    expect(velocidad).toBeLessThan(25);
    expect(await page.locator('.brands-edge').evaluateAll((elements) => elements.map((element) => ({ x: element.getBoundingClientRect().x, width: element.getBoundingClientRect().width })))).toEqual(bordes);
    await expect(page.locator('.brands-viewport')).toHaveCSS('filter', 'none');
    await expect(page.locator('.brands-edge-left span').first()).toHaveCSS('backdrop-filter', 'blur(1px)');
    if (width === 390) expect(bordes[0]!.width).toBeLessThanOrEqual(32);

    const pausa = franja.getByRole('button', { name: 'Pausar movimiento de marcas', exact: true });
    await pausa.focus();
    await pausa.press('Space');
    await expect(franja).toHaveAttribute('data-motion', 'paused');
    await page.locator('.brands-track').evaluate(async (element) => {
      await Promise.all(element.getAnimations().map((animacion) => animacion.ready));
    });
    const posicionPausada = (await muestra(page)).x;
    await page.waitForTimeout(250);
    expect((await muestra(page)).x).toBeCloseTo(posicionPausada, 2);
    await page.locator('#marcas').screenshot({ path: `artifacts/ritmo-suministros/despues/marcas-${width}.png`, animations: 'allow' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await franja.getByRole('button', { name: 'Reanudar movimiento de marcas', exact: true }).press('Enter');
    await expect(franja).toHaveAttribute('data-motion', 'running');
  });
}

test('lista completa estática con movimiento reducido y sin JavaScript', async ({ browser }) => {
  for (const javaScriptEnabled of [true, false]) {
    const contexto = await browser.newContext({ viewport: { width: 390, height: 1000 }, reducedMotion: 'reduce', javaScriptEnabled });
    const page = await contexto.newPage();
    await page.goto('http://localhost:4321/');
    const franja = page.locator('#marcas');
    await franja.scrollIntoViewIfNeeded();
    if (javaScriptEnabled) await expect(franja).toHaveAttribute('data-motion', 'static');
    await expect(franja.locator('.brands-list').first().locator('li')).toHaveCount(6);
    await expect(franja.locator('.brands-copy')).toBeHidden();
    await expect(franja.locator('.brands-pause')).toBeHidden();
    await expect(franja.locator('.brands-edge').first()).toBeHidden();
    expect(await franja.locator('.brands-track').evaluate((element) => element.getAnimations().length)).toBe(0);
    for (const item of await franja.locator('.brands-list').first().locator('li').all()) await expect(item).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
    if (javaScriptEnabled) await franja.screenshot({ path: 'artifacts/ritmo-suministros/despues/marcas-reduced-390.png' });
    await contexto.close();
  }
});

test('deja de desplazarse cuando la lista cabe', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('#marcas')).toHaveAttribute('data-motion', 'running');
  await page.locator('.brands-list').first().evaluate((element) => Array.from(element.children).slice(2).forEach((item) => item.remove()));
  await page.setViewportSize({ width: 1438, height: 1000 });
  await expect(page.locator('#marcas')).toHaveAttribute('data-motion', 'static');
  await expect(page.locator('.brands-copy')).toBeHidden();
  await expect(page.locator('.brands-pause')).toBeHidden();
  expect(await page.locator('.brands-track').evaluate((element) => element.getAnimations().length)).toBe(0);
});

test('producción excluye la demostración y los nombres sin confirmar', async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await expect(page.locator('[data-brands-ribbon]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Marcas que encuentras en Servielectric' })).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText(/Marca 01|Demostración local|3M|Philips|Sylvania/);
  await page.close();
});
