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

import React from 'react';
import { render } from '@testing-library/react';

it('should load the app', () => {
  global.process.env = {
    ...global.process.env,
    GRAPHQL_URL: 'http://localhost:3000/graphql',
  };
  const { default: App } = require('../../../../packages/client/src/app'); // eslint-disable-line global-require

  const { queryByTestId } = render(
    <App />,
  );

  expect(queryByTestId('app')).toBeInTheDocument();

  delete global.process.env.GRAPHQL_URL;
});
