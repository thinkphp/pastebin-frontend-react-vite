import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSnippet } from '../api.js';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expiry, setExpiry] = useState('24h');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Continutul nu poate fi gol!');
      return;
    }

    setLoading(true);
    try {
      const { slug } = await createSnippet({ title, content, expiry });
      navigate(`/s/${slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Adauga un fragment de cod sau text</h3>

      {error && <p className="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titlu (optional):</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: config.json sau script.py"
          maxLength={200}
        />

        <label htmlFor="content">Continut:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Lipeste codul sau textul aici..."
          maxLength={1000000}
          required
        />

        <label htmlFor="expiry">Expirare:</label>
        <select id="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)}>
          <option value="never">Niciodata</option>
          <option value="24h">Dupa 24 de ore</option>
          <option value="1h">Dupa 1 ora</option>
        </select>

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? 'Se creeaza...' : 'Creeaza Link'}
        </button>
      </form>
    </div>
  );
}
