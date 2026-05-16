import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetsPage.css';

const sets = [
    { id: '6259', name: 'Islander Catamaran',    year: '1994', pieces: 63,  theme: 'Pirates', preview: '/data/6259_preview.jpg', instruction: null,                        tags: ['Pirates', 'Boat'],   desc: 'A small pirate island catamaran. The perfect starter set for fans of the Pirates series.' },
    { id: '6277', name: 'Imperial Trading Post', year: '1991', pieces: 420, theme: 'Pirates', preview: '/data/6277_preview.png', instruction: '/data/6277_instruction.pdf', tags: ['Pirates', 'Fort'],   desc: 'An impressive imperial soldiers fort with a trading dock, cannons and a full crew.' },
    { id: '6541', name: 'Intercoastal Seaport',  year: '1991', pieces: 591, theme: 'Pirates', preview: '/data/6541_preview.jpg', instruction: null,                        tags: ['Pirates', 'Port'],   desc: 'A massive coastal port with cranes, warehouses and full support for pirate ships.' },
];

const SetModal = ({ set, onClose, onParts }) => {
    if (!set) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box glass" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

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
                                <span>pieces</span>
                            </div>
                        </div>
                        <div className="modal-stat">
                            <span className="modal-stat-icon">🗓</span>
                            <div>
                                <strong>{set.year}</strong>
                                <span>year released</span>
                            </div>
                        </div>
                        <div className="modal-stat">
                            <span className="modal-stat-icon">🏷</span>
                            <div>
                                <strong>#{set.id}</strong>
                                <span>set number</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        {set.instruction && (
                            <a href={set.instruction} target="_blank" rel="noreferrer" className="modal-btn modal-btn--secondary">
                                📄 Download instruction PDF
                            </a>
                        )}
                        <button className="modal-btn modal-btn--primary" onClick={() => onParts(set.id)}>
                            🔩 Show set parts
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
            <div className="set-card-hint">Click to see details →</div>
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
                <span>🧱 {set.pieces} pcs.</span>
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
                <p className="eyebrow">🌸 Collection</p>
                <h1>Your <span className="gradient-text">LEGO Sets</span></h1>
                <p>Click on a set to view details and browse its parts list.</p>
            </div>

            <div className="sets-stats glass">
                <div className="stat"><span className="stat-num gradient-text">{sets.length}</span><span>sets</span></div>
                <div className="stat-divider" />
                <div className="stat"><span className="stat-num gradient-text">{sets.reduce((s, x) => s + x.pieces, 0)}</span><span>total pieces</span></div>
                <div className="stat-divider" />
                <div className="stat"><span className="stat-num gradient-text">{sets.filter(s => s.instruction).length}</span><span>PDF instructions</span></div>
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
