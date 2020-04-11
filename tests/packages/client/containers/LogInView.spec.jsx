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

import { fireEvent, waitFor } from '@testing-library/react';
import merge from 'lodash.merge';
import React from 'react';

import AUTHENTICATE_MUTATION from '../../../../packages/client/src/graphql/mutations/AUTHENTICATE_MUTATION';
import LogInView from '../../../../packages/client/src/containers/LogInView/LogInView';
import renderWithProviders from '../../../utils/renderWithProviders';

const renderComponent = (testProps) => {
  const props = merge({}, {
    graphql: {
      client: {
        mutate: () => {},
      },
      data: {
        isAuthenticated: false,
      },
    },
  }, testProps);
  return renderWithProviders(
    <LogInView graphql={props.graphql} />,
  );
};

it('does not show a form if the user is authenticated', async () => {
  const { queryByPlaceholderText, queryByText } = renderComponent({
    graphql: {
      data: {
        isAuthenticated: true,
      },
    },
  });

  expect(queryByText('Personnummer'))
    .not
    .toBeInTheDocument();
  expect(queryByPlaceholderText('ååååmmddxxxx'))
    .not
    .toBeInTheDocument();
  expect(queryByText('Fortsätt'))
    .not
    .toBeInTheDocument();
});

it('shows a form if the user is not authenticated', () => {
  const { queryByPlaceholderText, queryByText } = renderComponent();

  expect(queryByText('Personnummer')).toBeInTheDocument();
  expect(queryByPlaceholderText('ååååmmddxxxx')).toBeInTheDocument();
  expect(queryByText('Fortsätt')).toBeInTheDocument();
});

it('accepts number credentials only', () => {
  const { getByPlaceholderText, queryByTestId } = renderComponent();

  expect(queryByTestId('numberInput__input')).toHaveValue('');

  fireEvent.change(getByPlaceholderText('ååååmmddxxxx'), {
    target: {
      value: 'abc',
    },
  });

  expect(queryByTestId('numberInput__input')).toHaveValue('');

  fireEvent.change(getByPlaceholderText('ååååmmddxxxx'), {
    target: {
      value: '123',
    },
  });

  expect(queryByTestId('numberInput__input')).toHaveValue('123');
});

it('shows an error message when the credentials are invalid', async () => {
  const { getByPlaceholderText, queryByTestId, queryByText } = renderComponent();

  expect(queryByTestId('icon__error'))
    .not
    .toBeInTheDocument();
  expect(queryByText('Ange ett giltig personnummer.'))
    .not
    .toHaveClass('inputValidationVISIBLE');

  fireEvent.change(getByPlaceholderText('ååååmmddxxxx'), {
    target: {
      value: '112233445566',
    },
  });
  fireEvent.blur(getByPlaceholderText('ååååmmddxxxx'));

  expect(queryByTestId('icon__error')).toBeInTheDocument();
  expect(queryByText('Ange ett giltig personnummer.')).toHaveClass('inputValidationVISIBLE');
});

it('shows a success message when the credentials are valid', async () => {
  const { getByPlaceholderText, queryByTestId } = renderComponent();

  expect(queryByTestId('icon__success'))
    .not
    .toBeInTheDocument();

  fireEvent.change(getByPlaceholderText('ååååmmddxxxx'), {
    target: {
      value: '190001012020',
    },
  });
  fireEvent.blur(getByPlaceholderText('ååååmmddxxxx'));

  expect(queryByTestId('icon__success')).toBeInTheDocument();
});

it('does not try to authenticate invalid credentials', async () => {
  const mutateMock = jest.fn().mockResolvedValue({
    data: {
      authenticate: {
        token: '',
      },
    },
  });

  const { getByPlaceholderText, getByText } = renderComponent({
    graphql: {
      client: {
        mutate: mutateMock,
      },
    },
  });
  fireEvent.change(getByPlaceholderText('ååååmmddxxxx'), {
    target: {
      value: '112233445566',
    },
  });
  fireEvent.click(getByText('Fortsätt'));

  expect(mutateMock)
    .not
    .toHaveBeenCalled();
});

it('tries to authenticate valid credentials', async () => {
  const mutateMock = jest.fn().mockResolvedValue({
    data: {
      authenticate: {
        token: '',
      },
    },
  });

  const { getByPlaceholderText, getByText } = renderComponent({
    graphql: {
      client: {
        mutate: mutateMock,
      },
    },
  });
  fireEvent.change(getByPlaceholderText('ååååmmddxxxx'), {
    target: {
      value: '190001012020',
    },
  });
  fireEvent.click(getByText('Fortsätt'));

  await waitFor(() => {
    expect(getByText('Väntar på svar från Mobilt BankID... Vänligen starta BankID-appen i din mobila enhet.')).toBeInTheDocument();
  });
  expect(mutateMock).toHaveBeenCalledWith({
    mutation: AUTHENTICATE_MUTATION,
    variables: {
      personalIdentityNumber: '190001012020',
    },
  });
});

it('accepts shorthand credentials', () => {
  const { getByPlaceholderText, queryByTestId, queryByText } = renderComponent();

  fireEvent.change(getByPlaceholderText('ååååmmddxxxx'), {
    target: {
      value: '0001012020',
    },
  });
  fireEvent.blur(getByPlaceholderText('ååååmmddxxxx'));

  expect(queryByTestId('numberInput__input')).toHaveValue('0001012020');
  expect(queryByTestId('icon__success')).toBeInTheDocument();

  fireEvent.change(getByPlaceholderText('ååååmmddxxxx'), {
    target: {
      value: '0001012021', // Invalid Luhn checksum.
    },
  });
  fireEvent.blur(getByPlaceholderText('ååååmmddxxxx'));

  expect(queryByTestId('numberInput__input')).toHaveValue('0001012021');
  expect(queryByTestId('icon__error')).toBeInTheDocument();
  expect(queryByText('Ange ett giltig personnummer.')).toHaveClass('inputValidationVISIBLE');
});
