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

import { createMemoryHistory } from 'history';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

import setDefaultClientState from '../../../../packages/client/src/graphql/clientState/setDefaultClientState';

const renderWithProviders = (ui, { mocks = [], path = '/', ...options } = {}) => {
  const cache = new InMemoryCache();
  const history = createMemoryHistory({
    initialEntries: [path],
  });

  setDefaultClientState(cache);

  return {
    ...render(
      <MockedProvider cache={cache} mocks={mocks}>
        <Router history={history}>{ui}</Router>
      </MockedProvider>,
      options
    ),
    cache,
    history,
  };
};

export default renderWithProviders;
