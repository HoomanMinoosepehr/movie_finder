import { test, expect } from '@playwright/test';

// create an authenticated user to use in the tests
const authenticatedUser = test.extend({
    page: async ({ page }, use) => {
        // Log in as a user before each test
        await page.goto('/auth/login');
        await page.fill('input[placeholder="Enter your email"]', 'hooman@minoo.com');
        await page.fill('input[placeholder="Enter your password"]', '12345');
        await page.click('button:has-text("Log In")');

        await expect(page).toHaveURL('/');
        await expect(page.locator('text=Hi, Hooman')).toBeVisible();

        await use(page);
    }
});

// the entire test group is skipped because we're not using a test database
authenticatedUser.describe.skip("Authenticated user flows", () => {
    authenticatedUser("Should be able to move to watch list", async ({ page }) => {
        await page.goto('/');
        await page.locator(' .grid div a').first().click();

        await page.waitForURL(/\/single-movie\/\d+/);

        // when the user is logged in, the watch list button should be visible
        const addButton = page.locator('button:has-text("Add to Watch List")')

        await expect (addButton).toBeVisible();
        if (await addButton.isVisible()) {
            await addButton.click();
        }

        // check if adding to the list is done and the button is changed
        await expect(page.locator('button:has-text("Remove from Watch List")')).toBeVisible();

        await page.click('button:has-text("Watch List")');

        // check if the authenticated user can see the watch list button
        // check if the authenticated user have access to their watch list
        await expect(page).toHaveURL('/watch-list');
        await expect(page.locator('h2:has-text("My Watch List")')).toBeVisible();
    });

    // check loging out process
    authenticatedUser("Should be able to log out", async ({ page }) => {
        await page.click('button:has-text("Logout")');

        await expect(page.locator('text=Login')).toBeVisible();
    });
});