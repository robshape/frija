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

import { gql } from '@apollo/client';
import { screen, waitFor } from '@testing-library/react';

import renderComponent from './renderComponent';

it('should redirect to the Home path if the user is authenticated', async () => {
  const { cache, history } = renderComponent();

  expect(screen.getByRole('progressbar')).toHaveClass('loader');

  const credentialsInput = await screen.findByRole('textbox', { name: 'Personnummer' });

  expect(credentialsInput).toBeInTheDocument();
  expect(history.location.pathname).toBe('/authenticate');

  cache.writeQuery({
    data: {
      isAuthenticated: true,
    },
    query: gql`
    { isAuthenticated }
    `,
  }); // https://github.com/apollographql/react-apollo/issues/3642#issuecomment-568271001

  await waitFor(() => expect(history.location.pathname).toBe('/'));
  expect(screen.queryByRole('textbox', { name: 'Personnummer' }))
    .not
    .toBeInTheDocument();
});
