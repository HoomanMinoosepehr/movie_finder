import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button component', () => {
    it('renders with correct text', () => {
        render(<Button title="Test Button" />);
        expect(screen.getByText("Test Button")).toBeInTheDocument();
    })

    it('calls the onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button title="Click Me" onClick={handleClick}/>)
        fireEvent.click(screen.getByText('Click Me'));
        fireEvent.click(screen.getByText('Click Me'));

        expect(handleClick).toHaveBeenCalledTimes(2)
    })
})