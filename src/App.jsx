import { Link, Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import SetsPage from "./pages/SetsPage";
import PartsPage from "./pages/PartsPage";
import FaqSplitPage from "./pages/FaqSplitPage";
import FloralDecor from "./components/FloralDecor";
import './App.css';

const NAV_LINKS = [
    { to: '/',      label: '🧱 Zestawy' },
    { to: '/parts', label: '🔩 Części' },
    { to: '/faq',   label: '💬 Pomoc' },
];

function NavLink({ to, label }) {
    const { pathname } = useLocation();
    const isActive = pathname === to;
    return (
        <Link to={to} className={`nav-link${isActive ? ' nav-link--active' : ''}`}>
            {label}
        </Link>
    );
}

function Navbar() {
    return (
        <header className="navbar glass">
            <div className="navbar-brand">
                <span className="navbar-logo">🌸</span>
                <span className="navbar-title">
                    <span className="gradient-text">Brick</span>
                    <span style={{ color: 'var(--text-heading)' }}>Lister</span>
                </span>
            </div>
            <nav className="navbar-links">
                {NAV_LINKS.map(l => <NavLink key={l.to} {...l} />)}
            </nav>
        </header>
    );
}

function App() {
    return (
        <BrowserRouter>
            <FloralDecor />
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/"      element={<SetsPage />} />
                    <Route path="/parts" element={<PartsPage />} />
                    <Route path="/faq"   element={<FaqSplitPage />} />
                </Routes>
            </main>
            <footer className="footer">
                <span>© 2026 BrickLister &nbsp;·&nbsp; Made by Michał Pawlaczyk</span>
            </footer>
        </BrowserRouter>
    );
}

export default App;