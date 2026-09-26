// In dev local, VITE_API_URL nu e setat -> foloseste ruta relativa /api,
// care e redirectionata de proxy-ul din vite.config.js catre localhost:4567.
// In productie (Vercel), setezi VITE_API_URL = https://<backend>.up.railway.app
const BASE_URL = import.meta.env.VITE_API_URL || '';
const API_BASE = `${BASE_URL}/api/snippets`;

export async function createSnippet({ title, content, expiry }) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, expiry }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Eroare necunoscuta.');
  return data;
}

export async function getSnippet(slug) {
  const res = await fetch(`${API_BASE}/${slug}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Eroare necunoscuta.');
  return data;
}
