import { test, expect } from '@playwright/test';

test.describe("Authentication flows", () => {
    // check the login page
    test("Should navigate to login page", async ({ page }) => {
        // find the login button and click
        await page.goto('/')
        await page.click('a:has-text("Login")')

        // check if user redirected to login page
        // check if login component is mounted as expected
        await expect(page).toHaveURL('/auth/login')
        await expect(page.locator('h1:has-text("Welcome Back")')).toBeVisible();
        await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible();
        await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible();
        await expect(page.locator('button:has-text("Log In")')).toBeVisible();
    })

    test("Should navigate to register page", async ({ page }) => {
        // go to login page
        // find button for register and click
        await page.goto('/auth/login');
        await page.click('a:has-text("Register")')

        // check if user redirected to register page
        // check if register component is mounted as expected
        await expect(page).toHaveURL('/auth/register')
        await expect(page.locator('h1:has-text("Join Movie Finder")')).toBeVisible();
        await expect(page.locator('input[placeholder="Enter your name"]')).toBeVisible();
        await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible();
        await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible();
        await expect(page.locator('button:has-text("Register")')).toBeVisible();
    })

    // is kipped because need to interact with the db
    test.skip("Should get error in case of wrong credentials", async ({ page }) => {
        // go to login page
        await page.goto('/auth/login');

        // fill the wrong email and password
        await page.fill('input[placeholder="Enter your email"]', 'wrong@email.com');
        await page.fill('input[placeholder="Enter your password"]', 'wrongpassword');
        await page.click('button:has-text("Log In")')

        // check if error message is displayed
        await expect(page.locator('p:has-text("Invalid email or password! Please try again.")')).toBeVisible({ timeout: 10000 });
    })

})