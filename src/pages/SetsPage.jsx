import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetsPage.css';

const sets = [
    { id: '6259', name: 'Islander Catamaran',    year: '1994', pieces: 63,  theme: 'Pirates', preview: '/data/6259_preview.jpg', instruction: null,                        tags: ['Piraci', 'Łódź'],   desc: 'Mały katamaran z wyspy piratów. Idealny zestaw startowy dla miłośników serii Pirates.' },
    { id: '6277', name: 'Imperial Trading Post', year: '1991', pieces: 420, theme: 'Pirates', preview: '/data/6277_preview.png', instruction: '/data/6277_instruction.pdf', tags: ['Piraci', 'Fort'],   desc: 'Imponujący fort imperialnych żołnierzy z dokiem handlowym, armatami i bogatą załogą.' },
    { id: '6541', name: 'Intercoastal Seaport',  year: '1991', pieces: 591, theme: 'Pirates', preview: '/data/6541_preview.jpg', instruction: null,                        tags: ['Piraci', 'Port'],   desc: 'Ogromny port nabrzeżny z dźwigami, magazynami i pełną obsługą statków pirackich.' },
];

const SetModal = ({ set, onClose, onParts }) => {
    if (!set) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box glass" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Zamknij">✕</button>

                <div className="modal-img-wrap">
                    <img src={set.preview} alt={set.name} className="modal-img" />
                    <div className="modal-img-overlay" />
                    <div className="modal-img-badge">
                        {set.tags.map(t => <span key={t} className="badge">{t}</span>)}
                    </div>
                </div>

                <div className="modal-content">
                    <p className="eyebrow modal-eyebrow">#{set.id} · {set.theme} · {set.year}</p>
                    <h2 className="modal-title">{set.name}</h2>
                    <p className="modal-desc">{set.desc}</p>

                    <div className="modal-stats">
                        <div className="modal-stat">
                            <span className="modal-stat-icon">🧱</span>
                            <div>
                                <strong>{set.pieces}</strong>
                                <span>elementów</span>
                            </div>
                        </div>
                        <div className="modal-stat">
                            <span className="modal-stat-icon">🗓</span>
                            <div>
                                <strong>{set.year}</strong>
                                <span>rok wydania</span>
                            </div>
                        </div>
                        <div className="modal-stat">
                            <span className="modal-stat-icon">🏷</span>
                            <div>
                                <strong>#{set.id}</strong>
                                <span>numer zestawu</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        {set.instruction && (
                            <a href={set.instruction} target="_blank" rel="noreferrer" className="modal-btn modal-btn--secondary">
                                📄 Pobierz instrukcję PDF
                            </a>
                        )}
                        <button className="modal-btn modal-btn--primary" onClick={() => onParts(set.id)}>
                            🔩 Pokaż części zestawu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SetCard = ({ set, featured, onClick }) => (
    <article
        className={`set-card glass${featured ? ' set-card--featured' : ''}`}
        onClick={() => onClick(set)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onClick(set)}
    >
        <div className="set-card-img-wrap">
            <img src={set.preview} alt={set.name} className="set-card-img" />
            <div className="set-card-img-overlay" />
            <div className="set-card-hint">Kliknij, aby zobaczyć szczegóły →</div>
            {set.instruction && (
                <span className="set-card-pdf" onClick={e => e.stopPropagation()}>
                    <a href={set.instruction} target="_blank" rel="noreferrer">📄 PDF</a>
                </span>
            )}
        </div>
        <div className="set-card-body">
            <div className="set-card-tags">
                {set.tags.map(t => <span key={t} className="badge">{t}</span>)}
            </div>
            <h3 className="set-card-name">{set.name}</h3>
            <div className="set-card-meta">
                <span>🗓 {set.year}</span>
                <span>🧱 {set.pieces} el.</span>
                <span className="set-card-id">#{set.id}</span>
            </div>
        </div>
    </article>
);

const SetsPage = () => {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleParts = (id) => {
        setSelected(null);
        navigate('/parts', { state: { setId: id } });
    };

    return (
        <div>
            <div className="page-header">
                <p className="eyebrow">🌸 Kolekcja</p>
                <h1>Twoje <span className="gradient-text">Zestawy</span> LEGO</h1>
                <p>Kliknij w zestaw, aby zobaczyć szczegóły i przejść do listy części.</p>
            </div>

            <div className="sets-stats glass">
                <div className="stat"><span className="stat-num gradient-text">{sets.length}</span><span>zestawy</span></div>
                <div className="stat-divider" />
                <div className="stat"><span className="stat-num gradient-text">{sets.reduce((s, x) => s + x.pieces, 0)}</span><span>elementów</span></div>
                <div className="stat-divider" />
                <div className="stat"><span className="stat-num gradient-text">{sets.filter(s => s.instruction).length}</span><span>instrukcje PDF</span></div>
            </div>

            <div className="bento-grid">
                {sets.map((set, i) => (
                    <SetCard key={set.id} set={set} featured={i === 0} onClick={setSelected} />
                ))}
            </div>

            <SetModal set={selected} onClose={() => setSelected(null)} onParts={handleParts} />
        </div>
    );
};

export default SetsPage;
