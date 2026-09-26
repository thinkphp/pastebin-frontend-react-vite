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
    <div className="slip-wrap">
      <div className="slip">
        <div className="slip-header">
          <h3>New entry</h3>
          <span className="slip-number">No. <b>____</b></span>
        </div>
        <div className="perforation" />
        <div className="slip-body">
          {error && <p className="alert">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="title">Title (optional)</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="config.json, script.py..."
                maxLength={200}
              />
            </div>

            <div className="field">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your code or text here..."
                maxLength={1000000}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="expiry">Expires</label>
              <select id="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)}>
                <option value="never">Never</option>
                <option value="24h">After 24 hours</option>
                <option value="1h">After 1 hour</option>
              </select>
            </div>

            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Filing…' : 'Create entry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
