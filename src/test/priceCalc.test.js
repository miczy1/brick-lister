import { describe, it, expect } from 'vitest';

const calcTotalValue = (parts, pricePerBrick) =>
    parts.reduce((acc, p) => acc + (parseInt(p.quantity) || 0) * pricePerBrick, 0);

const filterParts = (parts, search) =>
    parts.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.elementId?.toLowerCase().includes(search.toLowerCase())
    );

describe('Przeliczanie ceny klocków', () => {
    const mockParts = [
        { name: 'Cegła 1x2',  elementId: '3004', quantity: '10' },
        { name: 'Cegła 2x4',  elementId: '3001', quantity: '5' },
        { name: 'Płyta 1x4',  elementId: '3710', quantity: '8' },
        { name: 'Belka 1x6',  elementId: '3009', quantity: '3' },
        { elementId: '9999',   quantity: 'invalid' },   // edge case
    ];

    it('oblicza sumę przy cenie 0.5 PLN/szt', () => {
        const total = calcTotalValue(mockParts, 0.5);
        // (10+5+8+3)*0.5 = 13.0
        expect(total).toBeCloseTo(13.0);
    });

    it('oblicza sumę przy cenie 1.00 PLN/szt', () => {
        const total = calcTotalValue(mockParts, 1.0);
        expect(total).toBeCloseTo(26.0);
    });

    it('zwraca 0 dla pustej listy', () => {
        expect(calcTotalValue([], 0.5)).toBe(0);
    });

    it('ignoruje nieprawidłową ilość (parseInt → NaN → 0)', () => {
        const total = calcTotalValue([{ quantity: 'invalid' }], 2.0);
        expect(total).toBe(0);
    });

    it('daje wynik 0 gdy cena = 0', () => {
        expect(calcTotalValue(mockParts, 0)).toBe(0);
    });
});

describe('Filtrowanie części', () => {
    const parts = [
        { name: 'Cegła czerwona', elementId: '3004R' },
        { name: 'Cegła niebieska', elementId: '3004B' },
        { name: 'Płyta 1x4',       elementId: '3710' },
    ];

    it('filtruje po nazwie (case-insensitive)', () => {
        expect(filterParts(parts, 'cegła')).toHaveLength(2);
        expect(filterParts(parts, 'CEGŁA')).toHaveLength(2);
    });

    it('filtruje po fragmencie elementId', () => {
        expect(filterParts(parts, '3004')).toHaveLength(2);
        expect(filterParts(parts, '3710')).toHaveLength(1);
    });

    it('zwraca puste dla braku wyników', () => {
        expect(filterParts(parts, 'xxxxxxx')).toHaveLength(0);
    });

    it('zwraca wszystko dla pustego zapytania', () => {
        expect(filterParts(parts, '')).toHaveLength(3);
    });
});

describe('Edge cases – pricePerBrick', () => {
    it('pricePerBrick nie może być ujemne (Math.max)', () => {
        const decrement = (v) => Math.max(0, +(v - 0.1).toFixed(2));
        expect(decrement(0.1)).toBeCloseTo(0.0);
        expect(decrement(0.0)).toBe(0);
        expect(decrement(-1)).toBe(0);
    });

    it('inkrementacja działa poprawnie', () => {
        const increment = (v) => +(v + 0.1).toFixed(2);
        expect(increment(0.5)).toBeCloseTo(0.6);
        expect(increment(0.9)).toBeCloseTo(1.0);
    });
});

