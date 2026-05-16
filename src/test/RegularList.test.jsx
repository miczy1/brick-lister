import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegularList from '../components/RegularList';

const TestItem = ({ item }) => <div data-testid="test-item">{item.name}</div>;

describe('RegularList', () => {
    it('renderuje pustą listę bez błędu', () => {
        const { container } = render(
            <RegularList items={[]} resourceName="item" ItemComponent={TestItem} />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renderuje poprawną liczbę elementów', () => {
        const items = [
            { name: 'Cegła 1x2', elementId: '3004' },
            { name: 'Cegła 2x4', elementId: '3001' },
            { name: 'Płyta 1x4', elementId: '3710' },
        ];
        render(<RegularList items={items} resourceName="item" ItemComponent={TestItem} />);
        expect(screen.getAllByTestId('test-item')).toHaveLength(3);
    });

    it('przekazuje właściwy prop resourceName do ItemComponent', () => {
        const items = [{ name: 'Klocek testowy', elementId: 'TEST-01' }];
        const NameChecker = ({ item }) => <span>{item.name}</span>;
        render(<RegularList items={items} resourceName="item" ItemComponent={NameChecker} />);
        expect(screen.getByText('Klocek testowy')).toBeInTheDocument();
    });

    it('przekazuje dodatkowe propsy do ItemComponent', () => {
        const items = [{ name: 'A', elementId: '1' }];
        const ExtraChecker = ({ item, extra }) => <span>{item.name}-{extra}</span>;
        render(<RegularList items={items} resourceName="item" ItemComponent={ExtraChecker} extra="TEST" />);
        expect(screen.getByText('A-TEST')).toBeInTheDocument();
    });
});

