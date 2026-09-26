const API_BASE = '/api/snippets';

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
