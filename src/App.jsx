import {Link, Route, Router, Routes} from "react-router-dom";

function App() {
  return(
      <Router>
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
      </Router>
  );
}

export default App;