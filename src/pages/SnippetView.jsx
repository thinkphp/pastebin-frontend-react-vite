import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSnippet } from '../api.js';

export default function SnippetView() {
  const { slug } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getSnippet(slug)
      .then((data) => { if (!cancelled) setSnippet(data); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [slug]);

  const handleCopyLink = async () => {

        try {

          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);

        } catch ( err ) {

            console.error("Copy failed!", err);
        }
  }

  if (error) {
    return (
      <div className="slip-wrap">
        <div className="slip">
          <div className="slip-body">
            <p className="alert">{error}</p>
            <Link to="/" className="link-btn">+ new entry</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!snippet) return <p className="loading-text">Retrieving entry…</p>;

  return ( 
    <div className="slip-wrap">
      <div className="slip">
        <div className="slip-header">
          <h3>{snippet.title}</h3>
          <span className="slip-number">No. <b>{snippet.slug}</b></span>
        </div>
        <div className="perforation" />
        <div className="slip-body">
          <div className="meta-line">
            <span>filed {new Date(snippet.created_at).toLocaleString()}</span>
            <span className="dot">·</span>
            <span>
              {snippet.expires_at
                ? `expires ${new Date(snippet.expires_at).toLocaleString()}`
                : 'never expires'}
            </span>
          </div>

          <pre><code>{snippet.content}</code></pre>

          <div className="slip-footer">

             <button
               onClick={handleCopyLink}
               className={`copy-btn ${copied ? 'is-copied' : ''}`}
               >
               <span className="copy-btn-icon">{copied ? '✓' : '⧉'}</span>
               <span className="copy-btn-text">{copied ? 'Copied' : 'Copy link'}</span>
            </button>

            <a
              href={`${import.meta.env.VITE_API_URL || ''}/api/snippets/${snippet.slug}/raw`}
              className="link-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              view raw
            </a>
            <Link to="/" className="link-btn">+ new entry</Link> 
          </div>
        </div>
      </div> 
    </div>

  );
}
