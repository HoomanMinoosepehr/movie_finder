import { render, screen } from '@testing-library/react';
import MovieCard from '@/components/MovieCard';

// creating a simple img tag to use instead of Image component that is used to render image in MovieCard component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => <img {...props}/>
}));

describe('MovieCard Component', () => {
    // creating fake data for movie card
    const data = {
        id: '12',
        title: "Test Movie",
        poster_path: "test_poster.jpg"
    }

    it('renders movie title correctly', () => {
        render(<MovieCard data={data}/>)
        expect(screen.getByText("Test Movie")).toBeInTheDocument();
    })
});