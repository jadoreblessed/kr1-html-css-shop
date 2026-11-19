import { cpSync, rmSync } from 'node:fs';

const project = new URL('../', import.meta.url);
const source = new URL('dist/', project);

for (const directory of ['assets/', 'images/']) {
  const destination = new URL(directory, project);
  rmSync(destination, { recursive: true, force: true });
  cpSync(new URL(directory, source), destination, { recursive: true });
}

for (const file of ['index.html', 'catalog.html', 'product.html', 'order.html', 'contacts.html', 'sitemap.xml']) {
  cpSync(new URL(file, source), new URL(file, project));
}
