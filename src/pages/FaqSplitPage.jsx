import { useState } from 'react';
import { SplitScreen } from '../layouts/SplitScreen';
import './FaqSplitPage.css';

const faqs = [
    { q: 'Jak zaimportować części?',       a: 'Wejdź w zakładkę 🔩 Części — lista wczytuje się automatycznie z pliku CSV.' },
    { q: 'Gdzie są instrukcje PDF?',        a: 'W zakładce 🧱 Zestawy, przy kafelku kazdego zestawu pojawi się przycisk 📄 PDF.' },
    { q: 'Czy mogę zmienić cenę elementu?', a: 'Tak! Na stronie Części znajdziesz kalkulator — wpisz swoją cenę za sztukę, a wartość zaktualizuje się w locie.' },
    { q: 'Skąd pochodzi baza zestawów?',    a: 'Dane o zestawach są hardcodowane w aplikacji i oparte na prawdziwych zestawach LEGO Pirates z lat 90\'.' },
];

const FaqItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`faq-item glass${open ? ' faq-item--open' : ''}`} onClick={() => setOpen(o => !o)}>
            <div className="faq-question">
                <span>{q}</span>
                <span className="faq-arrow">{open ? '▲' : '▼'}</span>
            </div>
            {open && <div className="faq-answer">{a}</div>}
        </div>
    );
};

const FaqComponent = () => (
    <div>
        <div className="page-header" style={{ marginBottom: 20 }}>
            <p className="eyebrow">🌸 Baza wiedzy</p>
            <h2>Pytania &amp; <span className="gradient-text">Odpowiedzi</span></h2>
        </div>
        <div className="faq-list">
            {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
    </div>
);

const FormComponent = () => {
    const [email, setEmail]     = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent]       = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Wysyłanie (symulacja):', { email, message });
        setSent(true);
        setTimeout(() => { setSent(false); setEmail(''); setMessage(''); }, 3000);
    };

    return (
        <div>
            <div className="page-header" style={{ marginBottom: 20 }}>
                <p className="eyebrow">✉️ Kontakt</p>
                <h2>Napisz <span className="gradient-text">do nas</span></h2>
            </div>
            {sent ? (
                <div className="form-success glass">
                    <span className="form-success-icon">🌸</span>
                    <strong>Wysłano! Dziękujemy za wiadomość.</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>Odpowiemy wkrótce.</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-field">
                        <label>Adres e‑mail</label>
                        <input type="email" placeholder="ty@przykład.pl"
                            value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Wiadomość</label>
                        <textarea rows={5} placeholder="Opisz swój problem lub pytanie…"
                            value={message} onChange={e => setMessage(e.target.value)} required />
                    </div>
                    <button type="submit" className="submit-btn">
                        Wyślij wiadomość 🌸
                    </button>
                </form>
            )}
        </div>
    );
};

const FaqSplitPage = () => (
    <div>
        <div className="page-header">
            <p className="eyebrow">💬 Pomoc</p>
            <h1>Centrum <span className="gradient-text">Pomocy</span></h1>
            <p>Znajdź odpowiedź lub napisz do nas bezpośrednio.</p>
        </div>
        <SplitScreen leftWeight={1} rightWeight={1}>
            <FaqComponent />
            <FormComponent />
        </SplitScreen>
    </div>
);

export default FaqSplitPage;

