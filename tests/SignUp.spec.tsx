import { test, expect, Page, BrowserContext } from '@playwright/test';
import debug from '@playwright/test'

// Define a test fixture for the page
test.describe('SignUp Page', () => {

  test('should sign up a new user', async ({page}) => {
    // Navigate to the SignUp page
    await page.goto('http://localhost:3001/signup'); // Adjust the URL as needed
   
    // Fill in the email and password fields
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'testpassword');

    // Click the radio button for the desired role (e.g., Admin, Hotel-admin, User)
    await page.click(`input[value="Admin"]`); // Adjust as needed

    // Submit the form
    await page.click('button[type="submit"]');
    expect(page.url()).toBe('http://localhost:3001/signup');

   
  });
});
test('Login form should display an error message on invalid login', async ({ page }) => {
    // Open your React app in the browser
    await page.goto('http://localhost:3001/signup'); 
  
    // Fill in incorrect email and password
    await page.fill('input[name="email"]', 'incorrect-email@example.com');
    await page.fill('input[name="password"]', 'incorrect-password');
  
    // Click the "Sign In" button
    await page.click('button[type="submit"]');
  
    // Wait for the error message to appear
    await page.waitForSelector('.text-red-600'); // Adjust the selector as needed
  
    // Assert that the error message is displayed
    const errorMessage = await page.textContent('.text-red-600');
    expect(errorMessage).toBe('The email address is already in use.'); // Adjust the expected error message
  });
