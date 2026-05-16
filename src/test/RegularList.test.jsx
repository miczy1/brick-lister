import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegularList from '../components/RegularList';

/* ── Test item component ── */
const TestItem = ({ item }) => <div data-testid="test-item">{item.name}</div>;

describe('RegularList', () => {
    it('renders an empty list without errors', () => {
        const { container } = render(
            <RegularList items={[]} resourceName="item" ItemComponent={TestItem} />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renders the correct number of items', () => {
        const items = [
            { name: 'Brick 1x2', elementId: '3004' },
            { name: 'Brick 2x4', elementId: '3001' },
            { name: 'Plate 1x4', elementId: '3710' },
        ];
        render(<RegularList items={items} resourceName="item" ItemComponent={TestItem} />);
        expect(screen.getAllByTestId('test-item')).toHaveLength(3);
    });

    it('passes the correct resourceName prop to ItemComponent', () => {
        const items = [{ name: 'Test brick', elementId: 'TEST-01' }];
        const NameChecker = ({ item }) => <span>{item.name}</span>;
        render(<RegularList items={items} resourceName="item" ItemComponent={NameChecker} />);
        expect(screen.getByText('Test brick')).toBeInTheDocument();
    });

    it('passes extra props to ItemComponent', () => {
        const items = [{ name: 'A', elementId: '1' }];
        const ExtraChecker = ({ item, extra }) => <span>{item.name}-{extra}</span>;
        render(<RegularList items={items} resourceName="item" ItemComponent={ExtraChecker} extra="TEST" />);
        expect(screen.getByText('A-TEST')).toBeInTheDocument();
    });
});
