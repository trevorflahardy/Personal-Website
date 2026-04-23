import { expect, test, type Page } from '@playwright/test';

const routes = [
  { slug: 'home', path: '/' },
  { slug: 'chai', path: '/p/chai' },
  { slug: 'docuflow', path: '/p/docuflow' },
  { slug: 'fury', path: '/p/fury' },
  { slug: 'cnt', path: '/p/cnt-study-hub' },
  { slug: 'baro-rs', path: '/p/baro-rs' },
  { slug: 'baro-rs-driver-bh1750', path: '/p/baro-rs/drivers/bh1750' },
  { slug: 'kew', path: '/p/kew' },
  { slug: 'rootline', path: '/p/rootline' },
  { slug: 'slice-guard', path: '/p/slice-guard' },
  { slug: 'regviz', path: '/p/regviz' },
  { slug: 'pp', path: '/p/pickle-pockets' },
] as const;

const computedSelectors = [
  'body',
  'main',
  '.hero-title',
  '.title',
  '.title-2',
  '.subtitle',
  '.body',
  '.card-title',
  '.card-body',
  '.glass-card',
  '.glass-thin',
  '.glass-regular',
  '.glass-thick',
];

const computedProps = [
  'color',
  'background-color',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'padding',
  'margin',
  'border-radius',
  'box-shadow',
  'opacity',
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('sidebar-guide-v1', 'true');
      localStorage.setItem('sidebar-collapsed', 'false');
    } catch {
      /* storage unavailable — fall back to class-only */
    }
    document.documentElement.classList.add('dark');
  });
});

async function settle(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await page.waitForTimeout(300);
}

async function snapshotComputed(page: Page) {
  return page.evaluate(
    ({ selectors, props }) => {
      const out: Record<string, Record<string, string> | null> = {};
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (!el) {
          out[sel] = null;
          continue;
        }
        const style = getComputedStyle(el);
        const entry: Record<string, string> = {};
        for (const p of props) entry[p] = style.getPropertyValue(p);
        out[sel] = entry;
      }
      return out;
    },
    { selectors: computedSelectors, props: computedProps },
  );
}

const maskSelectors: Record<string, string[]> = {
  'baro-rs': ['.hero-scope'],
  'baro-rs-driver-bh1750': ['.hero-scope'],
};

for (const route of routes) {
  test.describe(route.slug, () => {
    test(`${route.slug} — screenshot`, async ({ page }) => {
      await page.goto(route.path);
      await settle(page);
      const masks = (maskSelectors[route.slug] ?? []).map((sel) =>
        page.locator(sel),
      );
      await expect(page).toHaveScreenshot(`${route.slug}.png`, {
        fullPage: true,
        mask: masks,
      });
    });

    test(`${route.slug} — computed styles`, async ({ page }) => {
      await page.goto(route.path);
      await settle(page);
      const snapshot = await snapshotComputed(page);
      expect(JSON.stringify(snapshot, null, 2)).toMatchSnapshot(
        `${route.slug}.computed.json`,
      );
    });
  });
}
