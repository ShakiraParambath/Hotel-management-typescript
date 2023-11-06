import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByPlaceholder('Enter email').click();
  await page.getByPlaceholder('Enter email').fill('admin1@gmail.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('admin123');
  await page.getByPlaceholder('Enter password').press('Enter');
  await page.getByRole('link', { name: 'BOOKING DETAILS' }).click();
  await page.getByRole('heading', { name: 'Hotel Booking Details' }).click();
  await page.getByTestId('table').click();
  await page.getByRole('columnheader', { name: 'Customer Name' }).click();
  await page.getByRole('columnheader', { name: 'Hotel Name' }).click();
  await page.getByRole('columnheader', { name: 'Check-in Date' }).click();
  await page.getByRole('columnheader', { name: 'Check-out Date' }).click();
  await page.getByRole('columnheader', { name: 'Number of Rooms Booked' }).click();
  await page.getByRole('columnheader', { name: 'Amount' }).click();
  await page.getByRole('cell', { name: 'johne k' }).click();
  await page.getByRole('cell', { name: 'abc hoteel' }).first().click();
  await page.getByRole('cell', { name: '10/25/2021' }).first().click();
  await page.getByRole('cell', { name: '10/30/2021' }).first().click();
  await page.getByRole('cell', { name: '2', exact: true }).first().click();
  await page.getByRole('cell', { name: '2500' }).first().click();
});