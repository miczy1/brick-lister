import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const PartsPage = () => {
    const [parts, setParts] = useState([]);
    const [totalValue, setTotalValue] = useState(0);

    const [pricePerBrick, setPricePerBrick] = useState(0.5);

    useEffect(() => {
        fetch('/data/6541_parts.csv')
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setParts(results.data);
                    }
                });
            });
    }, []);

    useEffect(() => {
        let sum = 0;
        parts.forEach(part => {
            const qty = parseInt(part.quantity) || 0;
            sum += (qty * pricePerBrick);
        });
        setTotalValue(sum);
    }, [parts, pricePerBrick]);

    return (
        <div>
            <h2>Lista Części (Parts)</h2>

            <div style={{ marginBottom: '20px' }}>
                <label>Symulowana cena za sztukę (PLN): </label>
                <input
                    type="number"
                    step="0.1"
                    value={pricePerBrick}
                    onChange={(e) => setPricePerBrick(parseFloat(e.target.value) || 0)}
                />
                <h3>Całkowita wartość zestawu: {totalValue.toFixed(2)} PLN</h3>
            </div>

            <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th>Obrazek</th>
                    <th>Nazwa</th>
                    <th>Numer ID</th>
                    <th>Ilość</th>
                    <th>Wartość ({pricePerBrick} szt)</th>
                </tr>
                </thead>
                <tbody>
                {parts.map((part, index) => (
                    <tr key={index}>
                        <td>
                            <img src={part.image} alt={part.name} width="50" />
                        </td>
                        <td>{part.name}</td>
                        <td>{part.elementId}</td>
                        <td>{part.quantity}</td>
                        <td>{(parseInt(part.quantity) * pricePerBrick).toFixed(2)} PLN</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PartsPage;