import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SplitScreen } from '../layouts/SplitScreen';

describe('SplitScreen', () => {
    const renderSplit = () =>
        render(
            <SplitScreen leftWeight={1} rightWeight={2}>
                <div>Panel Lewy</div>
                <div>Panel Prawy</div>
            </SplitScreen>
        );

    it('renderuje oba panele', () => {
        renderSplit();
        expect(screen.getByText('Panel Lewy')).toBeInTheDocument();
        expect(screen.getByText('Panel Prawy')).toBeInTheDocument();
    });

    it('zawiera przycisk zmiany układu', () => {
        renderSplit();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('domyślnie układ poziomy (flexDirection: row)', () => {
        renderSplit();
        const btn = screen.getByRole('button');
        expect(btn.textContent).toContain('Pionowo');
    });

    it('zmienia układ po kliknięciu przycisku', () => {
        renderSplit();
        const btn = screen.getByRole('button');
        fireEvent.click(btn);
        expect(btn.textContent).toContain('Poziomo');
        // Klikamy ponownie – wrót do poziomego
        fireEvent.click(btn);
        expect(btn.textContent).toContain('Pionowo');
    });
});

