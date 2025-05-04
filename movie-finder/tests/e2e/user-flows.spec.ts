import { test, expect } from '@playwright/test';

test.describe("Movie Finder User Flows", () => {
    // test home page
    test("Should display home page with movies", async ({ page }) => {
        await page.goto("/");

        // check if page is loaded and includes title and the button for login
        await expect(page.locator('h2:has-text("Latest Movies")')).toBeVisible();
        await expect(page.locator('a:has-text("Login")')).toBeVisible();
        
        // Check search functionality exists
        await expect(page.locator('input[placeholder*="Search for movies"]')).toBeVisible();
    })

    // test for search bar functionality
    test("Should Search for movies", async ({ page }) => {
        await page.goto("/");

        // inserting the search term
        await page.fill('input[placeholder="Search for movies (min. 2 characters)..."]', 'working man');

        // check if the search bar is updating the URL
        await page.waitForURL('**/search?query=working+man');

        // check if user being redirected to the search page
        await expect(page.locator('h2:has-text("Search Results for:")')).toBeVisible();
        await expect(page.locator('h2:has-text("working man")')).toBeVisible();
    });

    test("Should go to the single movie page", async ({ page }) => {
        await page.goto("/");

        // click on the first movie
        await page.locator('.grid div a').first().click();
        
        // chack if user being routed
        await page.waitForURL(/\/single-movie\/\d+/);
        
        // check if movie infos are displayed
        await expect(page.locator('h1').first()).toBeVisible();
        await expect(page.locator('h2:has-text("Overview")')).toBeVisible();

        // check if the CastPicturesProps is mounted
        await expect(page.locator('h2:has-text("Cast")')).toBeVisible();

        // check if login message is displayed for unauthorized users
        // instead of mounting the WatchListButton
        await expect(page.locator('text=Login required')).toBeVisible();
    })
});