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
import merge from 'lodash.merge';
import React from 'react';

import AuthScene from '../../../../../packages/client/src/scenes/AuthScene';
import renderWithProviders from '../../utils/renderWithProviders';

const renderComponent = (testProps, testOptions) => {
  const options = merge({}, {
    path: '/authenticate',
  }, testOptions);

  const renderResult = renderWithProviders(
    <AuthScene />,
    options,
  );
  renderResult
    .cache
    .writeQuery({
      data: {
        isAuthenticated: false,
      },
      query: gql`
      { isAuthenticated }
      `,
    }); // https://github.com/apollographql/react-apollo/issues/3642#issuecomment-568271001

  return renderResult;
};

export default renderComponent;
