import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../components/ListItem';

describe('ListItem – part mode', () => {
    const part = { name: 'Brick 1x2', elementId: '3004', quantity: '10', image: '' };

    it('renders the part name', () => {
        render(<ListItem item={part} />);
        expect(screen.getByText('Brick 1x2')).toBeInTheDocument();
    });

    it('renders the elementId code', () => {
        render(<ListItem item={part} />);
        expect(screen.getByText('3004')).toBeInTheDocument();
    });

    it('displays the quantity', () => {
        render(<ListItem item={part} />);
        expect(screen.getByText('10 pcs.')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handler = vi.fn();
        render(<ListItem item={part} onClick={handler} />);
        fireEvent.click(screen.getByText('Brick 1x2'));
        expect(handler).toHaveBeenCalledWith(part);
    });
});

describe('ListItem – set mode', () => {
    const set = { id: '6541', name: 'Intercoastal Seaport', year: '1991', pieces: 591, preview: '' };

    it('renders the set name', () => {
        render(<ListItem item={set} />);
        expect(screen.getByText('Intercoastal Seaport')).toBeInTheDocument();
    });

    it('displays set metadata', () => {
        render(<ListItem item={set} />);
        expect(screen.getByText(/#6541/)).toBeInTheDocument();
    });
});

describe('ListItem – generic mode', () => {
    it('renders key-value pairs', () => {
        const generic = { status: 'active', type: 'test' };
        render(<ListItem item={generic} />);
        expect(screen.getByText('status:')).toBeInTheDocument();
        expect(screen.getByText('active')).toBeInTheDocument();
    });
});

