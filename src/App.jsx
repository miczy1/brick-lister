import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import SetsPage from "./pages/SetsPage";
import PartsPage from "./pages/PartsPage";
import FaqSplitPage from "./pages/FaqSplitPage";

function App() {
  return(
      <BrowserRouter>
        <nav style={{ padding: '1rem', background: '#eee', display: 'flex', gap: '1rem' }}>
          <Link to="/">Zestawy (Sets)</Link>
          <Link to="/parts">Części (Parts)</Link>
          <Link to="/faq">Pomoc (FAQ)</Link>
        </nav>

        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={ <SetsPage /> } />
            <Route path="/parts" element={ <PartsPage /> } />
            <Route path="/faq" element={ <FaqSplitPage /> } />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;