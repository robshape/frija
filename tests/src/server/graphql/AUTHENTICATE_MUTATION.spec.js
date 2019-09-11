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

import AUTHENTICATE_MUTATION from '../../../../src/client/graphql/mutations/AUTHENTICATE_MUTATION';
import isTokenDateValid from '../../../../src/client/utils/token/isTokenValid';
import serverTestClient from '../../../utils/serverTestClient';

it('does not authenticate credentials with invalid length', async () => {
  const { mutate } = serverTestClient();
  const { errors } = await mutate({
    mutation: AUTHENTICATE_MUTATION,
    variables: {
      personalIdentityNumber: '112233',
    },
  });

  expect(errors[0].message).toEqual(expect.any(String));
});

it('does not authenticate credentials with invalid date', async () => {
  const { mutate } = serverTestClient();
  const { errors } = await mutate({
    mutation: AUTHENTICATE_MUTATION,
    variables: {
      personalIdentityNumber: '000000000000',
    },
  });

  expect(errors[0].message).toEqual(expect.any(String));
});

it('does not authenticate credentials with invalid checksum', async () => {
  const { mutate } = serverTestClient();
  const { errors } = await mutate({
    mutation: AUTHENTICATE_MUTATION,
    variables: {
      personalIdentityNumber: '190001012021',
    },
  });

  expect(errors[0].message).toEqual(expect.any(String));
});

it('authenticates credentials', async () => {
  const { mutate } = serverTestClient();
  const { data } = await mutate({
    mutation: AUTHENTICATE_MUTATION,
    variables: {
      personalIdentityNumber: '190001012020',
    },
  });
  const isDateValid = isTokenDateValid(data.authenticate.token);

  expect(isDateValid).toBe(true);
});

it('authenticates shorthand credentials', async () => {
  const { mutate } = serverTestClient();
  const { data } = await mutate({
    mutation: AUTHENTICATE_MUTATION,
    variables: {
      personalIdentityNumber: '0001012020',
    },
  });
  const isDateValid = isTokenDateValid(data.authenticate.token);

  expect(isDateValid).toBe(true);
});
