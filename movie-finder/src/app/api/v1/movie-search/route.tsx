import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const api_key = process.env.TMDB_API_KEY;
    const reqParams = request.nextUrl.searchParams;
    const query = reqParams.get('query');
    const page = reqParams.get('page');
    
    // Ensure query is at least 2 characters
    if (!query || query.length < 2) {
        return NextResponse.json({ 
            results: [], 
            page: 1, 
            total_pages: 0,
            total_results: 0
        });
    }
    
    const url = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
    
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
        console.error('Error fetching search data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}