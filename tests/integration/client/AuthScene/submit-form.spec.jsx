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

import { fireEvent, waitFor } from '@testing-library/react';

import AUTHENTICATE_MUTATION from '../../../../packages/client/src/graphql/mutations/AUTHENTICATE_MUTATION';
import renderComponent from './utils/renderComponent';

it('should validate credentials', async () => {
  const { getByLabelText, getByRole, getByText } = renderComponent();

  await waitFor(() => {
    expect(getByLabelText('Personnummer')).toBeInTheDocument();
    expect(getByLabelText('Personnummer')).toHaveValue('');

    expect(getByRole('button', { name: 'Fortsätt' })).toBeInTheDocument();

    expect(getByText('Ange ett giltig personnummer.'))
      .not
      .toHaveClass('inputValidationVISIBLE');
  });

  // Only numbers can be entered.
  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: 'abc',
    },
  });

  expect(getByLabelText('Personnummer')).toHaveValue('');

  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: '!@#',
    },
  });

  expect(getByLabelText('Personnummer')).toHaveValue('');

  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: '112233445566', // Numbers but not valid credentials.
    },
  });

  expect(getByLabelText('Personnummer')).toHaveValue('112233445566');

  // Validates credentials.
  fireEvent.blur(getByLabelText('Personnummer')); // Trigger validator.

  expect(getByLabelText('Personnummer')).toHaveValue('112233445566');
  expect(getByText('Ange ett giltig personnummer.')).toHaveClass('inputValidationVISIBLE');

  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: '19000101202', // Valid credentials with a missing a number.
    },
  });
  fireEvent.blur(getByLabelText('Personnummer'));

  expect(getByLabelText('Personnummer')).toHaveValue('19000101202');
  expect(getByText('Ange ett giltig personnummer.')).toHaveClass('inputValidationVISIBLE');

  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: '190001012020', // Valid credentials.
    },
  });
  fireEvent.blur(getByLabelText('Personnummer'));

  expect(getByLabelText('Personnummer')).toHaveValue('190001012020');
  expect(getByText('Ange ett giltig personnummer.'))
    .not
    .toHaveClass('inputValidationVISIBLE');

  // Validates shorthand credentials.
  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: '0001012021', // Shorthand credentials with an invalid Luhn checksum.
    },
  });
  fireEvent.blur(getByLabelText('Personnummer'));

  expect(getByLabelText('Personnummer')).toHaveValue('0001012021');
  expect(getByText('Ange ett giltig personnummer.')).toHaveClass('inputValidationVISIBLE');

  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: '0001012020', // Valid shorthand credentials
    },
  });
  fireEvent.blur(getByLabelText('Personnummer'));

  expect(getByLabelText('Personnummer')).toHaveValue('0001012020');
  expect(getByText('Ange ett giltig personnummer.'))
    .not
    .toHaveClass('inputValidationVISIBLE');
});

it('should submit valid credentials', async () => {
  const personalIdentityNumber = '190001012020';
  const resultMock = jest
    .fn()
    .mockReturnValue({
      data: {
        authenticate: {
          __typename: 'Token',
          token: 'token',
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

  const {
    getByLabelText,
    getByRole,
    getByText,
    queryByText,
  } = renderComponent({}, {
    mocks,
  });

  await waitFor(() => {
    expect(getByLabelText('Personnummer')).toBeInTheDocument();
    expect(getByLabelText('Personnummer')).toHaveValue('');

    expect(getByRole('button', { name: 'Fortsätt' })).toBeInTheDocument();
  });

  // Invalid shorthand credentials with an invalid Luhn checksum.
  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: '0001012021',
    },
  });
  fireEvent.click(getByRole('button', { name: 'Fortsätt' }));

  expect(queryByText('Väntar på svar från Mobilt BankID... Vänligen starta BankID-appen i din mobila enhet.'))
    .not
    .toBeInTheDocument();
  expect(global.sessionStorage.getItem('token')).toBeNull();
  expect(resultMock)
    .not
    .toHaveBeenCalled();

  // Valid credentials.
  fireEvent.change(getByLabelText('Personnummer'), {
    target: {
      value: personalIdentityNumber,
    },
  });
  fireEvent.click(getByRole('button', { name: 'Fortsätt' }));

  await waitFor(() => {
    expect(getByText('Väntar på svar från Mobilt BankID... Vänligen starta BankID-appen i din mobila enhet.')).toBeInTheDocument();
  });
  expect(global.sessionStorage.getItem('token')).toBe('token');
  expect(resultMock).toHaveBeenCalledTimes(1);
});
