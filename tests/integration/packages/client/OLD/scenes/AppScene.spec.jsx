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

import AppScene from '../../../../../../packages/client/src/scenes/AppScene';
import configureConfig from '../../../../../../packages/client/src/config';
import * as configureGraphQL from '../../../../../../packages/client/src/graphql/index';
import renderWithProviders from '../../../../utils/renderWithProviders';

const renderComponent = (testProps) => {
  const props = merge({}, {
    config: configureConfig({
      GRAPHQL_URL: 'http://localhost:3000/graphql',
    }),
  }, testProps);
  return renderWithProviders(
    <AppScene config={props.config} />,
  );
};

beforeEach(() => jest.restoreAllMocks());

it('does not load the app if the config is empty', () => {
  jest
    .spyOn(configureGraphQL, 'default')
    .mockImplementation(() => ({}));

  const { queryByTestId } = renderComponent();

  expect(queryByTestId('app'))
    .not
    .toBeInTheDocument();
});

it('loads the app', () => {
  const { queryByTestId } = renderComponent();

  expect(queryByTestId('app')).toBeInTheDocument();
});
