import { useState } from 'react';
import { SplitScreen } from '../layouts/SplitScreen';

const FaqComponent = () => {
    const faqs = [
        { q: "Jak zaimportować części?", a: "Wejdź w zakładkę Części i wczytaj plik CSV." },
        { q: "Gdzie są instrukcje?", a: "W zakładce Zestawy kliknij w odpowiedni kafelek." }
    ];

    return (
        <div>
            <h2>FAQ - Pytania i odpowiedzi</h2>
            {faqs.map((faq, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                    <strong>Q: {faq.q}</strong>
                    <p>A: {faq.a}</p>
                </div>
            ))}
        </div>
    );
};

const FormComponent = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Wysyłanie do bazy (symulacja):", { email, message });
        alert("Wysłano zapytanie!");
    };

    return (
        <div>
            <h2>Formularz kontaktowy</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="email"
                    placeholder="Twój email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Opisz problem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">Wyślij</button>
            </form>
        </div>
    );
};

const FaqSplitPage = () => {
    return (
        <SplitScreen leftWeight={1} rightWeight={2}>
            <FaqComponent />
            <FormComponent />
        </SplitScreen>
    );
};

export default FaqSplitPage;