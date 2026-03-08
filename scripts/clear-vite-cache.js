import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dirs = [
  path.join(root, 'node_modules', '.vite'),
  path.join(root, 'frontend', 'node_modules', '.vite'),
];
for (const cacheDir of dirs) {
  try {
    if (fs.existsSync(cacheDir)) {
      fs.rmSync(cacheDir, { recursive: true });
      console.log('Vite cache cleared:', cacheDir);
    }
  } catch (_) {}
}
