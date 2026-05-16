import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../components/ListItem';

describe('ListItem – tryb część (part)', () => {
    const part = { name: 'Cegła 1x2', elementId: '3004', quantity: '10', image: '' };

    it('renderuje nazwę części', () => {
        render(<ListItem item={part} />);
        expect(screen.getByText('Cegła 1x2')).toBeInTheDocument();
    });

    it('renderuje kod elementId', () => {
        render(<ListItem item={part} />);
        expect(screen.getByText('3004')).toBeInTheDocument();
    });

    it('wyświetla ilość', () => {
        render(<ListItem item={part} />);
        expect(screen.getByText('10 szt.')).toBeInTheDocument();
    });

    it('wywołuje onClick po kliknięciu', () => {
        const handler = vi.fn();
        render(<ListItem item={part} onClick={handler} />);
        fireEvent.click(screen.getByText('Cegła 1x2'));
        expect(handler).toHaveBeenCalledWith(part);
    });
});

describe('ListItem – tryb zestaw (set)', () => {
    const set = { id: '6541', name: 'Intercoastal Seaport', year: '1991', pieces: 591, preview: '' };

    it('renderuje nazwę zestawu', () => {
        render(<ListItem item={set} />);
        expect(screen.getByText('Intercoastal Seaport')).toBeInTheDocument();
    });

    it('wyświetla metadane zestawu', () => {
        render(<ListItem item={set} />);
        expect(screen.getByText(/#6541/)).toBeInTheDocument();
    });
});

describe('ListItem – tryb domyślny', () => {
    it('renderuje pary klucz-wartość', () => {
        const generic = { status: 'aktywny', typ: 'testowy' };
        render(<ListItem item={generic} />);
        expect(screen.getByText('status:')).toBeInTheDocument();
        expect(screen.getByText('aktywny')).toBeInTheDocument();
    });
});

