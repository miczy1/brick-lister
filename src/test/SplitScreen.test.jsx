import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SplitScreen } from '../layouts/SplitScreen';

describe('SplitScreen', () => {
    const renderSplit = () =>
        render(
            <SplitScreen leftWeight={1} rightWeight={2}>
                <div>Left Panel</div>
                <div>Right Panel</div>
            </SplitScreen>
        );

    it('renders both panels', () => {
        renderSplit();
        expect(screen.getByText('Left Panel')).toBeInTheDocument();
        expect(screen.getByText('Right Panel')).toBeInTheDocument();
    });

    it('contains a layout toggle button', () => {
        renderSplit();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('defaults to horizontal layout', () => {
        renderSplit();
        const btn = screen.getByRole('button');
        expect(btn.textContent).toContain('Stacked');
    });

    it('toggles layout on button click', () => {
        renderSplit();
        const btn = screen.getByRole('button');
        fireEvent.click(btn);
        expect(btn.textContent).toContain('Side by side');
        fireEvent.click(btn);
        expect(btn.textContent).toContain('Stacked');
    });
});
