import './SetsPage.css';

const sets = [
    { id: '6259', name: 'Islander Catamaran', year: '1994', pieces: 63,  preview: '/data/6259_preview.jpg', instruction: null,                        tags: ['Piraci', 'Łódź'] },
    { id: '6277', name: 'Imperial Trading Post', year: '1991', pieces: 420, preview: '/data/6277_preview.png', instruction: '/data/6277_instruction.pdf', tags: ['Piraci', 'Fort'] },
    { id: '6541', name: 'Intercoastal Seaport', year: '1991', pieces: 591, preview: '/data/6541_preview.jpg', instruction: null,                        tags: ['Piraci', 'Port'] },
];

const SetCard = ({ set, featured }) => (
    <article className={`set-card glass${featured ? ' set-card--featured' : ''}`}>
        <div className="set-card-img-wrap">
            <img src={set.preview} alt={set.name} className="set-card-img" />
            <div className="set-card-img-overlay" />
            {set.instruction && (
                <a href={set.instruction} target="_blank" rel="noreferrer" className="set-card-pdf">
                    📄 PDF
                </a>
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

const SetsPage = () => (
    <div>
        <div className="page-header">
            <p className="eyebrow">🌸 Kolekcja</p>
            <h1>
                Twoje <span className="gradient-text">Zestawy</span> LEGO
            </h1>
            <p>Przeglądaj swoją kolekcję, sprawdź instrukcje i odkrywaj szczegóły każdego zestawu.</p>
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
                <SetCard key={set.id} set={set} featured={i === 0} />
            ))}
        </div>
    </div>
);

export default SetsPage;
