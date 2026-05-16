import { describe, it, expect } from 'vitest';

/**
 * Unit tests for brick price calculation logic
 * (isolated – no React rendering)
 */

const calcTotalValue = (parts, pricePerBrick) =>
    parts.reduce((acc, p) => acc + (parseInt(p.quantity) || 0) * pricePerBrick, 0);

const filterParts = (parts, search) =>
    parts.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.elementId?.toLowerCase().includes(search.toLowerCase())
    );

describe('Brick price calculation', () => {
    const mockParts = [
        { name: 'Brick 1x2',  elementId: '3004', quantity: '10' },
        { name: 'Brick 2x4',  elementId: '3001', quantity: '5' },
        { name: 'Plate 1x4',  elementId: '3710', quantity: '8' },
        { name: 'Beam 1x6',   elementId: '3009', quantity: '3' },
        { elementId: '9999',   quantity: 'invalid' },
    ];

    it('calculates total at 0.5 PLN per brick', () => {
        expect(calcTotalValue(mockParts, 0.5)).toBeCloseTo(13.0);
    });

    it('calculates total at 1.00 PLN per brick', () => {
        expect(calcTotalValue(mockParts, 1.0)).toBeCloseTo(26.0);
    });

    it('returns 0 for an empty parts list', () => {
        expect(calcTotalValue([], 0.5)).toBe(0);
    });

    it('ignores invalid quantity (parseInt → NaN → 0)', () => {
        expect(calcTotalValue([{ quantity: 'invalid' }], 2.0)).toBe(0);
    });

    it('returns 0 when price is 0', () => {
        expect(calcTotalValue(mockParts, 0)).toBe(0);
    });
});

describe('Parts filtering', () => {
    const parts = [
        { name: 'Red Brick',  elementId: '3004R' },
        { name: 'Blue Brick', elementId: '3004B' },
        { name: 'Plate 1x4',  elementId: '3710' },
    ];

    it('filters by name (case-insensitive)', () => {
        expect(filterParts(parts, 'brick')).toHaveLength(2);
        expect(filterParts(parts, 'BRICK')).toHaveLength(2);
    });

    it('filters by partial elementId', () => {
        expect(filterParts(parts, '3004')).toHaveLength(2);
        expect(filterParts(parts, '3710')).toHaveLength(1);
    });

    it('returns empty array for no match', () => {
        expect(filterParts(parts, 'xxxxxxx')).toHaveLength(0);
    });

    it('returns all items for empty query', () => {
        expect(filterParts(parts, '')).toHaveLength(3);
    });
});

describe('pricePerBrick edge cases', () => {
    it('price cannot go below 0 (Math.max guard)', () => {
        const decrement = (v) => Math.max(0, +(v - 0.1).toFixed(2));
        expect(decrement(0.1)).toBeCloseTo(0.0);
        expect(decrement(0.0)).toBe(0);
        expect(decrement(-1)).toBe(0);
    });

    it('increment works correctly', () => {
        const increment = (v) => +(v + 0.1).toFixed(2);
        expect(increment(0.5)).toBeCloseTo(0.6);
        expect(increment(0.9)).toBeCloseTo(1.0);
    });
});
