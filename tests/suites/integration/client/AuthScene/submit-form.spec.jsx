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

import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AUTHENTICATE_MUTATION from '../../../../../packages/client/src/graphql/mutations/AUTHENTICATE_MUTATION';
import renderComponent from './renderComponent';

it('should validate the credentials', async () => {
  renderComponent();
  const credentialsInput = await screen.findByRole('textbox', { name: 'Personnummer' });

  expect(credentialsInput).toBeInTheDocument();

  // Only numbers can be entered.
  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('');

  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), 'abc');

  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('');

  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), '!@#');

  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('');

  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), '112233445566');

  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('112233445566');

  // Validates credentials.
  // userEvent.click(screen.getByRole('button', { name: 'Fortsätt' })); // Does not work here???
  fireEvent.blur(screen.getByRole('textbox', { name: 'Personnummer' })); // Trigger validator.

  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('112233445566');
  expect(screen.getByText('Ange ett giltig personnummer.')).toHaveClass('inputValidationVISIBLE');

  userEvent.clear(screen.getByRole('textbox', { name: 'Personnummer' }));
  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), '19000101202'); // Valid credentials with a missing a number.
  userEvent.click(screen.getByRole('button', { name: 'Fortsätt' })); // Trigger validator.

  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('19000101202');
  expect(screen.getByText('Ange ett giltig personnummer.')).toHaveClass('inputValidationVISIBLE');

  userEvent.clear(screen.getByRole('textbox', { name: 'Personnummer' }));
  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), '190001012020'); // Valid credentials.
  userEvent.click(screen.getByText('Personnummer')); // Trigger validator, without submit.

  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('190001012020');
  expect(screen.getByText('Ange ett giltig personnummer.'))
    .not
    .toHaveClass('inputValidationVISIBLE');

  // Validates shorthand credentials.
  userEvent.clear(screen.getByRole('textbox', { name: 'Personnummer' }));
  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), '0001012021'); // Shorthand credentials with an invalid Luhn checksum.
  userEvent.click(screen.getByRole('button', { name: 'Fortsätt' })); // Trigger validator.

  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('0001012021');
  expect(screen.getByText('Ange ett giltig personnummer.')).toHaveClass('inputValidationVISIBLE');

  userEvent.clear(screen.getByRole('textbox', { name: 'Personnummer' }));
  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), '0001012020'); // Valid shorthand credentials
  userEvent.click(screen.getByText('Personnummer')); // Trigger validator, without submit.

  expect(screen.getByRole('textbox', { name: 'Personnummer' })).toHaveValue('0001012020');
  expect(screen.getByText('Ange ett giltig personnummer.'))
    .not
    .toHaveClass('inputValidationVISIBLE');
});

it('should submit the credentials if they are valid', async () => {
  const personalIdentityNumber = '190001012020'; // Valid credentials.
  const resultMock = jest
    .fn()
    .mockReturnValue({
      data: {
        authenticate: {
          __typename: 'Token',
          token: 'validToken',
        },
      },
    });
  const mocks = [
    {
      request: {
        query: AUTHENTICATE_MUTATION,
        variables: {
          personalIdentityNumber,
        },
      },
      result: resultMock,
    },
  ];

  renderComponent({}, {
    mocks,
  });
  const credentialsInput = await screen.findByRole('textbox', { name: 'Personnummer' });

  expect(credentialsInput).toBeInTheDocument();

  // Invalid shorthand credentials should not be submitted.
  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), '0001012021'); // Shorthand credentials with an invalid Luhn checksum.
  userEvent.click(screen.getByRole('button', { name: 'Fortsätt' }));

  expect(screen.queryByRole('progressbar'))
    .not
    .toBeInTheDocument();
  expect(screen.queryByText('Väntar på svar från Mobilt BankID... Vänligen starta BankID-appen i din mobila enhet.'))
    .not
    .toBeInTheDocument();
  expect(resultMock)
    .not
    .toHaveBeenCalled();
  expect(global.sessionStorage.getItem('token')).toBeNull();

  // Valid credentials should be submitted.
  userEvent.clear(screen.getByRole('textbox', { name: 'Personnummer' }));
  await userEvent.type(screen.getByRole('textbox', { name: 'Personnummer' }), personalIdentityNumber);
  userEvent.click(screen.getByRole('button', { name: 'Fortsätt' }));

  expect(screen.getByRole('progressbar')).toHaveClass('loader');
  expect(screen.getByText('Väntar på svar från Mobilt BankID... Vänligen starta BankID-appen i din mobila enhet.')).toBeInTheDocument();
  await waitFor(() => expect(resultMock).toHaveBeenCalledTimes(1));
  expect(global.sessionStorage.getItem('token')).toBe('validToken');
});
