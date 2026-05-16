import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import RegularList from '../components/RegularList';
import ListItem from '../components/ListItem';
import { generatePartsPDF } from '../utils/pdfExport';
import './PartsPage.css';

const setsMeta = {
    '6259': { name: 'Islander Catamaran',    year: '1994', pieces: 63,  preview: '/data/6259_preview.jpg', color: '#f9a8d4' },
    '6277': { name: 'Imperial Trading Post', year: '1991', pieces: 420, preview: '/data/6277_preview.png', color: '#a5f3fc' },
    '6541': { name: 'Intercoastal Seaport',  year: '1991', pieces: 591, preview: '/data/6541_preview.jpg', color: '#c4b5fd' },
};
const DEFAULT_SET = '6541';
const csvMap = {
    '6259': '/data/6541_parts.csv',
    '6277': '/data/6541_parts.csv',
    '6541': '/data/6541_parts.csv',
};

const LoadingBar = ({ progress }) => (
    <div className="loading-bar-track">
        <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
    </div>
);

const SetHero = ({ meta, setId, onSwitch, allSets, partCount }) => (
    <div className="set-hero glass">
        <div className="set-hero-img-wrap">
            <img src={meta.preview} alt={meta.name} className="set-hero-img" />
            <div className="set-hero-img-overlay" style={{ background: `linear-gradient(135deg, ${meta.color}55, transparent)` }} />
        </div>
        <div className="set-hero-info">
            <div className="set-hero-chip">
                <span className="badge">🏷 #{setId}</span>
                <span className="badge">🗓 {meta.year}</span>
            </div>
            <h2 className="set-hero-name">{meta.name}</h2>
            <div className="set-hero-stats">
                <div className="hero-stat">
                    <span className="hero-stat-val gradient-text">{meta.pieces}</span>
                    <span>el. w zestawie</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                    <span className="hero-stat-val gradient-text">{partCount}</span>
                    <span>wczytanych</span>
                </div>
            </div>
        </div>
        <div className="set-hero-switcher">
            <p className="set-hero-switch-label">Zmień zestaw:</p>
            <div className="set-hero-switch-btns">
                {Object.entries(allSets).map(([id, m]) => (
                    <button
                        key={id}
                        className={`switch-btn${id === setId ? ' switch-btn--active' : ''}`}
                        onClick={() => onSwitch(id)}
                    >
                        <img src={m.preview} alt={m.name} />
                        <span>#{id}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const PartsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSet, setActiveSet] = useState(location.state?.setId || DEFAULT_SET);
    const [parts, setParts]       = useState([]);
    const [loading, setLoading]   = useState(true);
    const [progress, setProgress] = useState(0);
    const [pricePerBrick, setPricePerBrick] = useState(0.5);
    const [search, setSearch]     = useState('');

    useEffect(() => {
        setLoading(true);
        setProgress(0);
        setParts([]);

        const t1 = setTimeout(() => setProgress(35), 80);
        const t2 = setTimeout(() => setProgress(65), 200);

        fetch(csvMap[activeSet] || '/data/6541_parts.csv')
            .then(r => r.text())
            .then(csv => {
                setProgress(90);
                Papa.parse(csv, {
                    header: true,
                    skipEmptyLines: true,
                    complete: ({ data }) => {
                        setParts(data);
                        setProgress(100);
                        setTimeout(() => setLoading(false), 350);
                    },
                });
            });

        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [activeSet]);

    const handleSwitch = (id) => {
        setActiveSet(id);
        navigate('/parts', { state: { setId: id }, replace: true });
    };

    const meta = setsMeta[activeSet];
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
                <p>Kliknij zestaw poniżej, aby wczytać jego elementy i obliczyć wartość.</p>
            </div>

            <SetHero
                meta={meta}
                setId={activeSet}
                onSwitch={handleSwitch}
                allSets={setsMeta}
                partCount={parts.length}
            />

            {loading && <LoadingBar progress={progress} />}

            {!loading && parts.length > 0 && (
                <details className="parts-quicklist glass">
                    <summary className="parts-quicklist-summary">
                        <span>📋 Podgląd listy <span className="badge">RegularList + ListItem</span></span>
                        <span className="parts-quicklist-count">{parts.slice(0, 8).length} z {parts.length}</span>
                    </summary>
                    <div className="parts-quicklist-body">
                        <RegularList
                            items={parts.slice(0, 8)}
                            resourceName="item"
                            ItemComponent={ListItem}
                        />
                    </div>
                </details>
            )}

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

                <button
                    className="pdf-btn"
                    disabled={loading || parts.length === 0}
                    onClick={() => generatePartsPDF({ meta, setId: activeSet, parts: filtered, pricePerBrick, totalValue })}
                >
                    📄 Pobierz PDF
                </button>
            </div>

            <div className={`parts-table-wrap glass${loading ? ' parts-table-wrap--loading' : ''}`}>
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
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="parts-row parts-row--skeleton">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <td key={j}><div className="skeleton" /></td>
                                    ))}
                                </tr>
                            ))
                        ) : filtered.length === 0 ? (
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
            {!loading && <p className="parts-count">{filtered.length} z {parts.length} elementów</p>}
        </div>
    );
};

export default PartsPage;



