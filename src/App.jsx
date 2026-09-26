import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SnippetView from './pages/SnippetView.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h2>
          <Link to="/" className="header-link">📋 React Pastebin</Link>
        </h2>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/s/:slug" element={<SnippetView />} />
        </Routes>
      </main>
    </div>
  );
}
