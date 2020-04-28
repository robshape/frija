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

import jwt from '../../../../packages/server/src/utils/jwt';
import serverTestClient from '../../utils/serverTestClient';
import VALIDATE_QUERY from '../../../../packages/client/src/graphql/queries/VALIDATE_QUERY';

it('does not validate a token that is invalid', async () => {
  const { query } = serverTestClient();
  const { data, errors } = await query({
    query: VALIDATE_QUERY,
    variables: {
      token: 'invalid',
    },
  });

  expect(data).toBeNull();
  expect(errors[0].message).toEqual(expect.any(String));
});

it('does not validate a token that is expired', async () => {
  const { query } = serverTestClient();
  const { data, errors } = await query({
    query: VALIDATE_QUERY,
    variables: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiOFpycFhrQ1JTNWQwSlhnSGYreTdhaE9nUWtDaDFjbGp5MEVsQ1RLMVVCc3RmeGZGdkx1eC9CRExBZmVLcHoxby5TTURTdlZVYi9WR0xCRHRPalBMRmxRPT0uRXNkNkd3Zmg3S1oyZm9rQklvbGhpQT09IiwiaWF0IjoxNTY3ODQwNzk3LCJleHAiOjE1Njc4NDEzOTd9.VqWaRnxjD-1sw_eJT_IxpiRi_RpyAr4WxVepA7EoC3c',
    },
  });

  expect(data).toBeNull();
  expect(errors[0].message).toEqual(expect.any(String));
});

it('validates a token', async () => {
  const token = jwt.sign('190001012020', {
    secret: 'c3e2a70e-ba85-4120-ba4d-1adc9c3d64c9',
    time: '10m',
  });

  const { query } = serverTestClient();
  const { data, errors } = await query({
    query: VALIDATE_QUERY,
    variables: {
      token,
    },
  });

  expect(data.validate).toBe(true);
  expect(errors).toBeUndefined();
});
