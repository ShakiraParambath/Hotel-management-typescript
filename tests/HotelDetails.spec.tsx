import { chromium ,test} from 'playwright/test';

test('hotel details',async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
//   const page1 = await context.newPage();
  await page.goto('http://localhost:3001/');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('testman1@mailinator.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('test123');
  await page.getByLabel('Login').click();
  await page.getByRole('link', { name: 'Le Meridien KochiKochi' }).click();
  await page.getByRole('heading', { name: 'Hotel Details' }).click();
  await page.getByRole('heading', { name: 'Le Meridien Kochi' }).click();
  await page.getByText('Meencut, Chittirapuram P.O, Chekuthan Mukku, Munnar, India, 685565').click();
  await page.getByText('Lizards are a widespread group of squamate reptiles, with over 6,000 species, ra').click();
  await page.getByText('Contact : 1111-222-333').click();
  await page.getByText('1500/day').click();
  await page.getByRole('button', { name: 'Book Now' }).click();
  await page.locator('div').filter({ hasText: 'Booking DetailsNameNameEnter Your AddressEnter Your AddressNo:of RoomsNo:of Room' }).nth(1).click();
  await page.close();
//   await page1.close();

  // ---------------------
  await context.close();
  await browser.close();
});