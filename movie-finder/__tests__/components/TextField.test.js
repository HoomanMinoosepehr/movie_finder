import { render, screen, fireEvent } from '@testing-library/react';
import TextField from '@/components/TextField';


describe('TextField Component', () => {
    it('it renders with correct title and placeholder', () => {
        render(<TextField title="Test field" placeholder="Write your test here"/>)
        expect(screen.getByText("Test field")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Write your test here")).toBeInTheDocument();
    })

    it('calls onChange function when text is entered', () => {
        const handleChange = jest.fn();
        render(<TextField title="Test field" placeholder="Write your test here" onChange={handleChange}/>)
        fireEvent.change(screen.getByPlaceholderText("Write your test here"), { target: { value: 'Test' } });
        expect(handleChange).toHaveBeenCalledWith('Test');
    })
})