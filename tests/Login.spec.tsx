import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';
import { Login } from '../src/Components/Login'

test('Login form should work correctly', async ({ page}) => {
    // Open your React app in the browser
    await page.goto('http://localhost:3001'); // Replace with the actual URL of your app
  
    // Fill in the email and password fields
    await page.fill('input[name="email"]', 'your-email@example.com');
    await page.fill('input[name="password"]', 'your-password');
  
    // Click the "Sign In" button
    await page.click('button[type="submit" ]');
  
    // Assert that you are on the home page
    expect(page.url()).toBe('http://localhost:3001/'); // Adjust the URL as needed
  
    // Optionally, you can close the browser after the test is complete
    // await browser.close();
  });
  
  
  test('Login form should display an error message on invalid login', async ({ page }) => {
    // Open your React app in the browser
    await page.goto('http://localhost:3001'); // Replace with the actual URL of your app
    await page.getByPlaceholder('Enter email').click();
    await page.getByPlaceholder('Enter email').fill('testman@gmail.com');
    await page.getByPlaceholder('Enter password').click();
    await page.getByPlaceholder('Enter password').fill('test1233');
    await page.getByLabel('Login').click();
    await page.getByText('auth/invalid-login-credentials').click();
  });

  test("login ui test", async ({page})=>{
      await page.goto('http://localhost:3001');
      await page.getByRole('img', { name: 'sky booking.com' }).click();
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter password').click();
  await page.getByText('Don\'t have an account? Sign Up').click();
  await page.getByLabel('Login').click();
  })
  