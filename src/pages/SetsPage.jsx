const sets = [
    {
        id: '6259',
        name: 'Zestaw 6259',
        preview: '/data/6259_preview.jpg',
        instruction: null,
    },
    {
        id: '6277',
        name: 'Zestaw 6277',
        preview: '/data/6277_preview.png',
        instruction: '/data/6277_instruction.pdf',
    },
    {
        id: '6541',
        name: 'Zestaw 6541',
        preview: '/data/6541_preview.jpg',
        instruction: null,
    },
];

const SetsPage = () => {
    return (
        <div>
            <h2>Zestawy (Sets)</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {sets.map(set => (
                    <div key={set.id} style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '16px',
                        width: '200px',
                        textAlign: 'center'
                    }}>
                        <img src={set.preview} alt={set.name} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />
                        <h3 style={{ fontSize: '1rem', margin: '10px 0' }}>{set.name}</h3>
                        {set.instruction && (
                            <a href={set.instruction} target="_blank" rel="noreferrer">
                                📄 Instrukcja (PDF)
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SetsPage;

