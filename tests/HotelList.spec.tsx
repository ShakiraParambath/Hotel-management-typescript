import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('testman');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('testman1@mailinator.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('test123');
  await page.getByLabel('Login').click();
  await page.getByRole('heading', { name: 'Hotel List' }).click();
  await page.getByLabel('Search by Name').click();
  await page.getByLabel('Search by Name').fill('leela');
  await page.getByLabel('Filter By Location').click();
  await page.getByRole('option', { name: 'Kozhikode' }).click();
  await page.getByRole('button', { name: 'te' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('admin1@gmail.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByPlaceholder('Enter password').press('Enter');
  await page.getByRole('button', { name: 'Add Hotels' }).click();
  await page.locator('div').filter({ hasText: 'Add New HotelHotel NameHotel NameSelect LocationSelect LocationAddressAddressCon' }).nth(1).click();
  await page.locator('div').filter({ hasText: 'Add New HotelHotel NameHotel NameSelect LocationSelect LocationAddressAddressCon' }).nth(1).click();
  await page.getByText('Hotel NameHotel NameSelect LocationSelect LocationAddressAddressContact NumberCo').click({
    clickCount: 4
  });
  await page.getByText('Hotel NameHotel NameSelect LocationSelect LocationAddressAddressContact NumberCo').click();
  await page.getByText('Hotel NameHotel NameSelect LocationSelect LocationAddressAddressContact NumberCo').click();
  await page.locator('li').filter({ hasText: 'The Leela Kovalam, a Raviz HotelThrissur' }).getByTestId('EditIcon')
  await page.locator('li').filter({ hasText: 'The Leela Kovalam, a Raviz HotelThrissur' }).getByTestId('DeleteIcon');
  await page.getByRole('heading', { name: 'Conform Delete' });
  await page.getByText('Are you sure you want to delete this hotel details?')
  await page.getByRole('button', { name: 'NO' })
  await page.getByRole('button', { name: 'YES' })
 
});