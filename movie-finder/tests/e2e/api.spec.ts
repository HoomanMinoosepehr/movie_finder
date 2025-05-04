import { test, expect } from '@playwright/test';

test.describe("Test API endpoints", () => {

    // test get endpoint to get the list of movies
    test("GET endpoint to get the list of movies", async ({ request }) => {
        // try to get the firs page
        const response = await request.get("/api/v1/movie-list?page=1");
        expect(response.ok).toBeTruthy();

        const body = await response.json();

        // test if the response is as expected
        expect(body.results).toBeDefined();
        expect(body.results.length).toBeGreaterThan(0);
        // check if the response includes the first page
        expect(body.page).toBe(1);
    });

    // test get endpoint to search movie
    test("GET endpoint to search the movies", async ({ request }) => {
        const response = await request.get("/api/v1/movie-search?query=dunk&page=1");

        expect(response.ok).toBeTruthy();
        const body = await response.json();
        expect(body.results).toBeDefined();
        expect(body.results.length).toBeGreaterThan(0);
        expect(body.page).toBe(1);
    });

    // test get endpoint to get movie's details
    test("GET endpoint for single movie", async ({ request }) => {

        // get the list and find the id of the first movie in the list
        const response = await request.get("/api/v1/movie-list?page=1");
        const data = await response.json();
        const firstMovieId = data.results[0].id;

        // get the details of the extracted movie id
        const singleMovie = await request.get(`/api/v1/single-movie?movie_id=${firstMovieId}`);
        expect(response.ok).toBeTruthy();
        const singleMovieData = await singleMovie.json();
        expect(singleMovieData).toBeDefined();

        // check if the received data belong to the first movie
        expect(singleMovieData.id).toBe(firstMovieId);
    })
})