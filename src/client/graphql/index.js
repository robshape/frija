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

import ApolloClient from 'apollo-boost';

import getStoredToken from '../utils/token/get-stored-token';
import isTokenValid from '../utils/token/is-token-valid';

// Used for local state management @client queries.
const INITIAL_STATE = {
  isAuthenticated: false,
};

const addAuthorizationHeader = (operation) => {
  let authorization = '';

  const token = getStoredToken();
  const isValidToken = isTokenValid(token);
  if (isValidToken) {
    authorization = token;
  }

  operation.setContext({
    headers: {
      accept: 'application/json',
      authorization,
    },
  });
};

const configureGraphQL = ({ graphqlUrl }) => new ApolloClient({
  clientState: {
    defaults: INITIAL_STATE,
    resolvers: {},
  },
  request: addAuthorizationHeader,
  uri: graphqlUrl,
});

export default configureGraphQL;
