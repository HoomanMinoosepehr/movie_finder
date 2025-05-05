# # Movie Finder
A Next.js application for discovering and managing your favorite movies.

### Overview

Movie Finder is a web application that allows users to:
* Browse the latest movies
* Search for specific titles
* View detailed information about movies, including cast
* Create an account and authenticate
* Add movies to a personal watchlist

The application is built with Next.js 15, using the App Router, and includes end-to-end testing with Playwright.

### Prerequisites

* Node.js 18.x or higher
* npm
* A PostgreSQL database (for user authentication and watchlists)
## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:HoomanMinoosepehr/movie_finder.git
cd movie_finder/movie-finder
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:
```bash
# Base URL for API requests
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database connection
DATABASE_URL=postgresql://username:password@localhost:5432/movie_finder
- username: your user name for your local database
- password: your password for your local database

# NextAuth configuration
NEXT_SECRET=boj02FVxp3j2rF+3cOrvxU5O4KwKkwbT+PfkOlRdxBA=

# TMDB API key to use the external API for movies information
TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTljNWUzZWZiY2FhOTE1ODgwZjY3NDBhY2RjZmFhMCIsIm5iZiI6MTc0NjA0MjI5NC4zMTcsInN1YiI6IjY4MTI3ZGI2MDZmMTU2MmM4YTRkMjljOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nviJBN4w7KQrkDnCOduPVa0WqSQidG71JQBxo6J6fxY
```

4. Set up the database with Prisma:
```bash
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser to see the application.

## Testing

### Running End-to-End Tests

The application uses Playwright for end-to-end testing. To run the tests:
1. Make sure your application is not already running on port 3000 (the test will start its own instance)
2. Run the tests:
```bash
npm test
```
3. To view the HTML test report after running tests:
```bash
npx playwright show-report
```

### Test Structure

Tests are organized in the following files inside `tests/e2e/`:
* `user-flows.spec.ts`: Tests for basic user interactions like browsing and searching
* `auth.spec.ts`: Tests for authentication flows
* `authenticated-user-flow.spec.ts`: Tests for authenticated user features (requires login).
* `api.spec.ts`: Tests for API endpoints
  
### Important Notes About Tests
* Some tests are marked with `test.skip()` because they require a database but would run against the real database. Even if we connect the application to our real database, running these tests would make permanent changes to your actual data (adding movies to watchlists, creating user accounts, etc).

* For proper testing, we should use a dedicated test database that's reset between test runs. Ideally, the test environment would:

1. Create a clean database instance before tests
2. Apply migrations to create the schema
3. Seed it with consistent test data
4. Run the tests against this isolated environment
5. Drop the database after tests complete

This approach ensures tests are reliable, repeatable, and don't affect production data. Without this setup, authentication tests that modify data are skipped to prevent corrupting the real database.

## Architecture and Design Decisions

### Frontend
* **Next.js App Router:** For server components and improved routing
* **TailwindCSS:** For styling
* **SWR:** For data fetching and caching

### Backend
* **Next.js API Routes:** For backend API endpoints
* **Prisma:** For database ORM
* **NextAuth:** For authentication

### Testing
* **Playwright:** For end-to-end testing across multiple browsers
* Tests are organized by feature and user flow

### Development Practices
* **Husky:** For pre-commit hooks
* **ESLint:** For code quality
* **TypeScript:** For type safety
* **Prettier:** For code formatting

## Assumptions and Limitations
1. Adding API keys, `.env` file content, or hardcoding credentials hass a serious security risk and is not a best practice! I’ve only included them in this file because this is a test application and the API key is freely available for testing purposes.
2. The application assumes access to a PostgreSQL database for user authentication and watchlist storage.
3. The movie data needs to come from an external API.
4. Some authenticated features are skipped in tests because the system for test database hasn't been set up yet.
5. The application is designed for both desktop and mobile views.

## Future Improvements
* Implement more robust error handling
* Enhance the watchlist functionality with categories or ratings
* Set up a system for the test database and add more end-to-end tests to check the functionality more accurately