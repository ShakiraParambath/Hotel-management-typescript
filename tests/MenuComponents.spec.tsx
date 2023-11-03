import { chromium ,test} from 'playwright/test';

test('menu components',async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
 
  await page.goto('http://localhost:3001/home');
  await page.getByText('SKY BOOKING.COM').click();
  await page.getByRole('link', { name: 'HOTEL LIST' }).click();
  await page.getByRole('link', { name: 'BOOKING DETAILS' }).click();
  await page.getByRole('button', { name: 'TE' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  // ---------------------
  await context.close();
  await browser.close();
});