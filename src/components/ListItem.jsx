import './ListItem.css';

const ListItem = ({ item = {}, onClick }) => {
    if (item.elementId !== undefined) {
        return (
            <div className="list-item list-item--part glass" onClick={() => onClick?.(item)}>
                <div className="list-item-img">
                    {item.image
                        ? <img src={item.image} alt={item.name} />
                        : <span>🧱</span>
                    }
                </div>
                <div className="list-item-body">
                    <span className="list-item-name">{item.name}</span>
                    <code className="list-item-code">{item.elementId}</code>
                </div>
                <span className="list-item-qty">{item.quantity} pcs.</span>
            </div>
        );
    }

    if (item.id !== undefined && item.pieces !== undefined) {
        return (
            <div className="list-item list-item--set glass" onClick={() => onClick?.(item)}>
                <div className="list-item-img list-item-img--set">
                    {item.preview
                        ? <img src={item.preview} alt={item.name} />
                        : <span>🧱</span>
                    }
                </div>
                <div className="list-item-body">
                    <span className="list-item-name">{item.name}</span>
                    <span className="list-item-meta">#{item.id} · {item.year} · {item.pieces} pcs.</span>
                </div>
                {item.tags?.map(t => (
                    <span key={t} className="badge" style={{ marginLeft: 4 }}>{t}</span>
                ))}
            </div>
        );
    }

    return (
        <div className="list-item list-item--generic glass">
            {Object.entries(item).map(([key, val]) => (
                <div key={key} className="list-item-kv">
                    <span className="list-item-key">{key}:</span>
                    <span className="list-item-val">{String(val)}</span>
                </div>
            ))}
        </div>
    );
};

export default ListItem;

