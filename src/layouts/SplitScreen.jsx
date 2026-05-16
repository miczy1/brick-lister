import { useState } from "react";

export const SplitScreen = ({ children, leftWeight = 1, rightWeight = 1 }) => {
    const [isVertical, setIsVertical] = useState(false);
    const [left, right] = children;

    return (
        <div>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                <button
                    onClick={() => setIsVertical(v => !v)}
                    style={{
                        padding: '8px 18px',
                        borderRadius: '99px',
                        border: '1.5px solid var(--border)',
                        background: 'var(--surface)',
                        backdropFilter: 'blur(12px)',
                        color: 'var(--primary)',
                        fontFamily: 'var(--sans)',
                        fontSize: '.85rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'transform .2s, box-shadow .2s',
                        boxShadow: 'var(--shadow-sm)',
                    }}
                    onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                >
                    {isVertical ? '⬅️ Poziomo' : '⬇️ Pionowo'}
                </button>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row',
                gap: '20px',
                alignItems: 'stretch',
            }}>
                <div className="glass" style={{ flex: leftWeight, padding: '28px' }}>
                    {left}
                </div>
                <div className="glass" style={{ flex: rightWeight, padding: '28px' }}>
                    {right}
                </div>
            </div>
        </div>
    );
};
