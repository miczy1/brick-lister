const Flower = ({ cx = 50, cy = 50, r = 18, petals = 6, petalColor = '#f9a8d4', centerColor = '#fbbf24', size = 80 }) => {
    const petalAngles = Array.from({ length: petals }, (_, i) => (i * 360) / petals);
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {petalAngles.map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const px = cx + (r * 1.6) * Math.cos(rad);
                const py = cy + (r * 1.6) * Math.sin(rad);
                return (
                    <ellipse
                        key={i}
                        cx={px} cy={py}
                        rx={r * 0.7} ry={r}
                        fill={petalColor}
                        opacity={0.85}
                        transform={`rotate(${angle}, ${px}, ${py})`}
                    />
                );
            })}
            {/* Inner ring */}
            {petalAngles.map((angle, i) => {
                const rad = ((angle + 360 / petals / 2) * Math.PI) / 180;
                const px = cx + (r * 1.1) * Math.cos(rad);
                const py = cy + (r * 1.1) * Math.sin(rad);
                return (
                    <circle key={`s${i}`} cx={px} cy={py} r={r * 0.45}
                        fill={petalColor} opacity={0.5}
                        style={{ filter: 'brightness(1.15)' }}
                    />
                );
            })}
            <circle cx={cx} cy={cy} r={r * 0.55} fill={centerColor} />
            <circle cx={cx - r*0.18} cy={cy - r*0.18} r={r * 0.18} fill="rgba(255,255,255,0.6)" />
        </svg>
    );
};

const Leaf = ({ color = '#86efac', size = 60, rotate = 0 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotate}deg)` }}>
        <path d="M50 90 C20 70, 10 40, 50 10 C90 40, 80 70, 50 90Z"
            fill={color} opacity={0.75} />
        <path d="M50 90 C50 60, 50 30, 50 10" stroke="rgba(255,255,255,0.5)"
            strokeWidth="2" fill="none" />
        {[20, 35, 50, 65].map((y, i) => (
            <path key={i}
                d={`M50 ${y} C${y < 50 ? 30 : 35} ${y - 8}, ${y < 50 ? 26 : 31} ${y}, 50 ${y}`}
                stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"
            />
        ))}
        {[20, 35, 50, 65].map((y, i) => (
            <path key={`r${i}`}
                d={`M50 ${y} C${y < 50 ? 70 : 65} ${y - 8}, ${y < 50 ? 74 : 69} ${y}, 50 ${y}`}
                stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"
            />
        ))}
    </svg>
);

const FloralDecor = () => (
    <>
        <div className="floral-bg" style={{ top: 80, right: 40, animationDelay: '0s', animationDuration: '9s' }}>
            <Flower size={120} petalColor="#f9a8d4" centerColor="#fbbf24" petals={8} />
        </div>

        <div className="floral-bg" style={{ bottom: 120, left: 20, animationDelay: '-3s', animationDuration: '11s' }}>
            <Flower size={100} petalColor="#c4b5fd" centerColor="#f59e0b" petals={6} />
        </div>

        <div className="floral-bg" style={{ top: 200, left: 60, animationDelay: '-5s', animationDuration: '7s', opacity: .22 }}>
            <Flower size={70} petalColor="#fed7aa" centerColor="#ec4899" petals={5} />
        </div>

        <div className="floral-bg" style={{ top: '45%', right: 15, animationDelay: '-2s', animationDuration: '13s', opacity: .20 }}>
            <Leaf color="#a7f3d0" size={80} rotate={-30} />
        </div>

        <div className="floral-bg" style={{ top: '35%', left: 10, animationDelay: '-7s', animationDuration: '10s', opacity: .18 }}>
            <Leaf color="#86efac" size={65} rotate={25} />
        </div>

        <div className="floral-bg" style={{ bottom: 60, right: 90, animationDelay: '-4s', animationDuration: '12s', opacity: .25 }}>
            <Flower size={90} petalColor="#a5f3fc" centerColor="#fbbf24" petals={7} />
        </div>

        <div className="floral-bg" style={{ top: 130, left: '52%', animationDelay: '-1s', animationDuration: '6s', opacity: .15 }}>
            <Flower size={45} petalColor="#fde68a" centerColor="#f43f5e" petals={5} />
        </div>
    </>
);

export default FloralDecor;

