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

import PrivateRoute from '../../../src/client/containers/PrivateRoute/PrivateRoute';
import renderWithProviders from '../../utils/renderWithProviders';

const renderComponent = (testProps) => {
  const props = merge({}, {
    component: () => (
      <div>
        componentMock
      </div>
    ),
    graphql: {
      data: {
        isAuthenticated: false,
      },
    },
  }, testProps);
  return renderWithProviders(
    <PrivateRoute component={props.component} graphql={props.graphql} />,
  );
};

it('does not show the route if the user is not authenticated', () => {
  const { queryByText } = renderComponent();

  expect(queryByText('componentMock'))
    .not
    .toBeInTheDocument();
});

it('shows the route if the user is authenticated', () => {
  const { queryByText } = renderComponent({
    graphql: {
      data: {
        isAuthenticated: true,
      },
    },
  });

  expect(queryByText('componentMock')).toBeInTheDocument();
});
