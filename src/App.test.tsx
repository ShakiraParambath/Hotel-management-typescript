import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders APP', () => {
  render(<App />);
  const linkElement = screen.getByText(/HOTEL MANAGEMENT/i);
  expect(linkElement).toBeInTheDocument();
});
