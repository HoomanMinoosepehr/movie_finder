import { NextResponse } from 'next/server';

export async function GET() {
    const api_key = process.env.TMDB_API_KEY;
    const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api_key}`,
        }
    };
    try {
        const response = await fetch(url, options);

        // fetch doesn't throw error in case of server failure
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }   
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}