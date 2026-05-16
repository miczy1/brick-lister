import { useState } from 'react';
import { SplitScreen } from '../layouts/SplitScreen';
import './FaqSplitPage.css';

const faqs = [
    { q: 'How do I import parts?',          a: 'Go to the 🔩 Parts tab — the list loads automatically from the CSV file.' },
    { q: 'Where are the PDF instructions?', a: 'In the 🧱 Sets tab, a 📄 PDF button will appear on each set tile if available.' },
    { q: 'Can I change the price per piece?', a: 'Yes! On the Parts page you will find a calculator — enter your price per brick and the total value updates instantly.' },
    { q: 'Where does the set data come from?', a: 'Set data is hardcoded in the app and based on real LEGO Pirates sets from the 1990s.' },
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
            <p className="eyebrow">🌸 Knowledge base</p>
            <h2>Questions &amp; <span className="gradient-text">Answers</span></h2>
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
        console.log('Sending (simulation):', { email, message });
        setSent(true);
        setTimeout(() => { setSent(false); setEmail(''); setMessage(''); }, 3000);
    };

    return (
        <div>
            <div className="page-header" style={{ marginBottom: 20 }}>
                <p className="eyebrow">✉️ Contact</p>
                <h2>Get in <span className="gradient-text">touch</span></h2>
            </div>
            {sent ? (
                <div className="form-success glass">
                    <span className="form-success-icon">🌸</span>
                    <strong>Sent! Thank you for your message.</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>We will get back to you soon.</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-field">
                        <label>E‑mail address</label>
                        <input type="email" placeholder="you@example.com"
                            value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-field">
                        <label>Message</label>
                        <textarea rows={5} placeholder="Describe your issue or question…"
                            value={message} onChange={e => setMessage(e.target.value)} required />
                    </div>
                    <button type="submit" className="submit-btn">
                        Send message 🌸
                    </button>
                </form>
            )}
        </div>
    );
};

const FaqSplitPage = () => (
    <div>
        <div className="page-header">
            <p className="eyebrow">💬 Support</p>
            <h1>Help <span className="gradient-text">Centre</span></h1>
            <p>Find an answer or reach out to us directly.</p>
        </div>
        <SplitScreen leftWeight={1} rightWeight={1}>
            <FaqComponent />
            <FormComponent />
        </SplitScreen>
    </div>
);

export default FaqSplitPage;

