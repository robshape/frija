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

import { InMemoryCache } from 'apollo-cache-inmemory';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import { render } from '@testing-library/react';

import clientState from '../../packages/client/src/graphql/clientState';
import resolvers from '../../packages/client/src/graphql/resolvers';

const renderWithProviders = (ui, {
  mocks = [],
  ...options
} = {}) => {
  const cache = new InMemoryCache();
  cache.writeData({
    data: clientState,
  });

  return render(
    <MockedProvider cache={cache} mocks={mocks} resolvers={resolvers}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </MockedProvider>,
    options,
  );
};

export default renderWithProviders;