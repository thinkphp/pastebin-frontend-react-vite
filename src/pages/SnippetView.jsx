import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSnippet } from '../api.js';

export default function SnippetView() {
  const { slug } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getSnippet(slug)
      .then((data) => { if (!cancelled) setSnippet(data); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [slug]);

  if (error) return <p className="alert">{error}</p>;
  if (!snippet) return <p>Se incarca...</p>;

  return (
    <div>
      <h3>{snippet.title}</h3>

      <div className="meta">
        Creat la: {new Date(snippet.created_at).toLocaleString('ro-RO')}
        {' | '}
        {snippet.expires_at
          ? `Expira la: ${new Date(snippet.expires_at).toLocaleString('ro-RO')}`
          : 'Expirare: Niciodata'}
      </div>

      <pre><code>{snippet.content}</code></pre>

      <p className="raw-link">
        <a href={`${import.meta.env.VITE_API_URL || ''}/api/snippets/${snippet.slug}/raw`}  target="_blank"  rel="noopener noreferrer">        
          📄 Vezi Text Brut / Raw
        </a>
      </p>

      <p>
        <Link to="/">➕ Adauga alt snippet</Link>
      </p>
    </div>
  );
}
