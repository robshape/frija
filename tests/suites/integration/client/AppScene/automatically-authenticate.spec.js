/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2020 Frija contributors.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see https://www.gnu.org/licenses/.

*/

import { screen } from '@testing-library/react';

import jwt from '../../../../../packages/server/src/utils/jwt';
import renderComponent from './renderComponent';

it('should show the Auth scene if there is no stored token', async () => {
  global.fetch = jest.fn();

  expect(global.sessionStorage.getItem('token')).toBeNull();

  renderComponent();

  expect(screen.getByRole('progressbar')).toHaveClass('loader');

  const subheadingText = await screen.findByText('identifiera dig med Mobilt BankID');

  expect(subheadingText).toBeInTheDocument();
  expect(global.fetch)
    .not
    .toHaveBeenCalled();
  expect(global.sessionStorage.getItem('token')).toBeNull();
});

it('should show the Auth scene if the stored token is not valid (client)', async () => {
  global.fetch = jest.fn();
  global
    .sessionStorage
    .setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiOFpycFhrQ1JTNWQwSlhnSGYreTdhaE9nUWtDaDFjbGp5MEVsQ1RLMVVCc3RmeGZGdkx1eC9CRExBZmVLcHoxby5TTURTdlZVYi9WR0xCRHRPalBMRmxRPT0uRXNkNkd3Zmg3S1oyZm9rQklvbGhpQT09IiwiaWF0IjoxNTY3ODQwNzk3LCJleHAiOjE1Njc4NDEzOTd9.VqWaRnxjD-1sw_eJT_IxpiRi_RpyAr4WxVepA7EoC3c'); // Expired token.

  expect(global.sessionStorage.getItem('token'))
    .not
    .toBeNull();

  renderComponent();

  expect(screen.getByRole('progressbar')).toHaveClass('loader');

  const subheadingText = await screen.findByText('identifiera dig med Mobilt BankID');

  expect(subheadingText).toBeInTheDocument();
  expect(global.fetch)
    .not
    .toHaveBeenCalled();
  expect(global.sessionStorage.getItem('token')).toBeNull();
});

it('should show the Auth scene if the stored token is not valid (server)', async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({
      text: async () => '{"errors":[{"message":"Invalid token."}]}',
    });
  global
    .sessionStorage
    .setItem('token', jwt.sign('190001012020', {
      secret: 'c3e2a70e-ba85-4120-ba4d-1adc9c3d64c9',
      time: '10m',
    }));

  expect(global.sessionStorage.getItem('token'))
    .not
    .toBeNull();

  renderComponent();

  expect(screen.getByRole('progressbar')).toHaveClass('loader');

  const subheadingText = await screen.findByText('identifiera dig med Mobilt BankID');

  expect(subheadingText).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.sessionStorage.getItem('token')).toBeNull();
});

it('should show the Home scene if the stored token is valid', async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({
      text: async () => '{"data":{"validate":true}}',
    });
  global
    .sessionStorage
    .setItem('token', jwt.sign('190001012020', {
      secret: 'c3e2a70e-ba85-4120-ba4d-1adc9c3d64c9',
      time: '10m',
    }));

  expect(global.sessionStorage.getItem('token'))
    .not
    .toBeNull();

  renderComponent();

  expect(screen.getByRole('progressbar')).toHaveClass('loader');

  const welcomeText = await screen.findByText('Välkommen till Frija.');

  expect(welcomeText).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.sessionStorage.getItem('token'))
    .not
    .toBeNull();
});
