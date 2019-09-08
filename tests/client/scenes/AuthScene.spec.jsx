/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2019 Frija contributors.

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

import merge from 'lodash.merge';
import React from 'react';
import { wait } from '@testing-library/react';

import AuthScene from '../../../src/client/scenes/AuthScene';
import jwt from '../../../src/server/utils/jwt';
import removeStoredToken from '../../../src/client/utils/token/removeStoredToken';
import renderWithProviders from '../../utils/renderWithProviders';
import setStoredToken from '../../../src/client/utils/token/setStoredToken';
import VALIDATE_QUERY from '../../../src/client/graphql/queries/VALIDATE_QUERY';

const renderComponent = (testProps, testOptions) => {
  const options = merge({}, {
    mocks: [],
  }, testOptions);
  return renderWithProviders(
    <AuthScene />,
    options,
  );
};

beforeEach(() => removeStoredToken());

it('does not log in the user if their token is expired', async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiOFpycFhrQ1JTNWQwSlhnSGYreTdhaE9nUWtDaDFjbGp5MEVsQ1RLMVVCc3RmeGZGdkx1eC9CRExBZmVLcHoxby5TTURTdlZVYi9WR0xCRHRPalBMRmxRPT0uRXNkNkd3Zmg3S1oyZm9rQklvbGhpQT09IiwiaWF0IjoxNTY3ODQwNzk3LCJleHAiOjE1Njc4NDEzOTd9.VqWaRnxjD-1sw_eJT_IxpiRi_RpyAr4WxVepA7EoC3c';
  setStoredToken(token);

  const { queryByPlaceholderText } = renderComponent();

  expect(queryByPlaceholderText('ååååmmddxxxx')).toBeInTheDocument();
});

it('does not log in the user if their token is invalid', async () => {
  const token = jwt.sign('190001012020', {
    secret: 'c3e2a70e-ba85-4120-ba4d-1adc9c3d64c9',
    time: '10m',
  });
  setStoredToken(token);

  const { queryByPlaceholderText, queryByTestId } = renderComponent({}, {
    mocks: [
      {
        request: {
          query: VALIDATE_QUERY,
          variables: {
            token,
          },
        },
        result: {
          data: {
            validate: false, // Invalid token.
          },
        },
      },
    ],
  });

  expect(queryByTestId('loader__spinner')).toBeInTheDocument();
  await wait(() => {
    expect(queryByTestId('loader__spinner'))
      .not
      .toBeInTheDocument();
  });
  expect(queryByPlaceholderText('ååååmmddxxxx')).toBeInTheDocument();
});

it('logs in the user if their token is valid', async () => {
  const token = jwt.sign('190001012020', {
    secret: 'c3e2a70e-ba85-4120-ba4d-1adc9c3d64c9',
    time: '10m',
  });
  setStoredToken(token);

  const { queryByPlaceholderText, queryByTestId } = renderComponent({}, {
    mocks: [
      {
        request: {
          query: VALIDATE_QUERY,
          variables: {
            token,
          },
        },
        result: {
          data: {
            validate: true,
          },
        },
      },
    ],
  });

  expect(queryByTestId('loader__spinner')).toBeInTheDocument();
  await wait(() => {
    expect(queryByTestId('loader__spinner'))
      .not
      .toBeInTheDocument();
  });
  expect(queryByPlaceholderText('ååååmmddxxxx'))
    .not
    .toBeInTheDocument();
});

it('shows a log in form if the user does not have a token', () => {
  const { queryByPlaceholderText } = renderComponent();

  expect(queryByPlaceholderText('ååååmmddxxxx')).toBeInTheDocument();
});
