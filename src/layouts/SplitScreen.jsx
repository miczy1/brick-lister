import { useState } from "react";

export const SplitScreen = ({
    children,
    leftWeight = 1,
    rightWeight = 1,
}) => {
    const [isVertical, setIsVertical] = useState(false);
    const [left, right] = children;

    return (
        <div>
            <button onClick={() => setIsVertical(!isVertical)} style={{ marginBottom: '1rem' }}>
                Zmień układ (Pionowo / Poziomo)
            </button>

            <div style={{
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                gap: '20px'
            }}>
                <div style={{ flex: leftWeight, background: '#f9f9f9', padding: '20px' }}>
                    {left}
                </div>
                <div style={{ flex: rightWeight, background: '#f1f1f1', padding: '20px' }}>
                    {right}
                </div>
            </div>
        </div>
    );
}
