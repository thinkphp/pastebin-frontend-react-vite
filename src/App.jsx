import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SnippetView from './pages/SnippetView.jsx';

export default function App() {
  return (
    <div className="app">
      <div className="brand">
        <Link to="/" className="brand-mark">
          past<span>bin</span>
        </Link>
        <span className="brand-tag">text sharing, duplicated</span>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/s/:slug" element={<SnippetView />} />
      </Routes>
    </div>
  );
}
