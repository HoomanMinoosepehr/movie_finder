import { NextResponse, NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
    const api_key = process.env.TMDB_API_KEY;
    const reqParams = request.nextUrl.searchParams;
    const movie_id = reqParams.get('movie_id');
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api_key}`,
        }
    };
    try {
        const response = await fetch(url, options);

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