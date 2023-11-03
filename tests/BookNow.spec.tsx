import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('testman1@mailinator.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('test123');
  await page.getByLabel('Login').click();
  await page.getByRole('link', { name: 'Le Meridien KochiKochi' }).click();
  await page.getByRole('button', { name: 'Book Now' }).click();
  await page.getByRole('heading', { name: 'Booking Details' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('siyas pp');
  await page.locator('div').filter({ hasText: /^Enter Your Address$/ }).click();
  await page.locator('div').filter({ hasText: /^Enter Your Address$/ }).locator('#outlined-basic').fill('pp house mannum kulam');
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('2');
  

  await page.locator('div').filter({ hasText: /^Check-in date & time$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Check-in date & time$/ }).locator('#outlined-basic').fill('2023-12-10T10:30');
 
  await page.locator('div').filter({ hasText: /^Check-out date & time$/ }).locator('#outlined-basic').click();
  await page.locator('div').filter({ hasText: /^Check-out date & time$/ }).locator('#outlined-basic').fill('2023-12-19T15:00');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Book Now' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
 
  await page.getByRole('button', { name: 'Book Now' }).click();
  page.getByRole('alert', { name: 'you successfully done your booking!!!' })
});