import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './PartsPage.css';

const PartsPage = () => {
    const [parts, setParts] = useState([]);
    const [pricePerBrick, setPricePerBrick] = useState(0.5);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('/data/6541_parts.csv')
            .then(r => r.text())
            .then(csv => Papa.parse(csv, {
                header: true,
                skipEmptyLines: true,
                complete: ({ data }) => setParts(data),
            }));
    }, []);

    const totalValue = parts.reduce((acc, p) => acc + (parseInt(p.quantity) || 0) * pricePerBrick, 0);

    const filtered = parts.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.elementId?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <p className="eyebrow">🔩 Lista elementów</p>
                <h1>Części <span className="gradient-text">zestawu</span></h1>
                <p>Pełna lista elementów z wycenialną kalkulacją wartości.</p>
            </div>

            <div className="parts-toolbar">
                <div className="parts-calc glass">
                    <label className="calc-label">💰 Cena za sztukę (PLN)</label>
                    <div className="calc-controls">
                        <button className="calc-btn" onClick={() => setPricePerBrick(v => Math.max(0, +(v - 0.1).toFixed(2)))}>−</button>
                        <input
                            type="number" step="0.1" min="0"
                            value={pricePerBrick}
                            onChange={e => setPricePerBrick(parseFloat(e.target.value) || 0)}
                            className="calc-input"
                        />
                        <button className="calc-btn" onClick={() => setPricePerBrick(v => +(v + 0.1).toFixed(2))}>+</button>
                    </div>
                    <div className="calc-total">
                        <span>Łączna wartość</span>
                        <span className="calc-total-num gradient-text">{totalValue.toFixed(2)} PLN</span>
                    </div>
                </div>

                <input
                    className="parts-search glass"
                    type="search"
                    placeholder="🔍 Szukaj po nazwie lub ID…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="parts-table-wrap glass">
                <table className="parts-table">
                    <thead>
                        <tr>
                            <th>Obrazek</th>
                            <th>Nazwa</th>
                            <th>ID</th>
                            <th>Ilość</th>
                            <th>Wartość</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={5} className="parts-empty">Nie znaleziono części 🌸</td></tr>
                        ) : filtered.map((part, i) => (
                            <tr key={i} className="parts-row">
                                <td>
                                    {part.image
                                        ? <img src={part.image} alt={part.name} className="parts-img" />
                                        : <span className="parts-img-placeholder">🧱</span>
                                    }
                                </td>
                                <td className="parts-name">{part.name}</td>
                                <td><code className="parts-code">{part.elementId}</code></td>
                                <td><span className="parts-qty">{part.quantity}</span></td>
                                <td className="parts-value">
                                    {((parseInt(part.quantity) || 0) * pricePerBrick).toFixed(2)} PLN
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="parts-count">{filtered.length} z {parts.length} elementów</p>
        </div>
    );
};

export default PartsPage;



