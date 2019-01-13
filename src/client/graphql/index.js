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

import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';

import clientState from './client-state';
import { getStoredToken, isTokenValid } from '../utils/token';

const authLink = setContext(() => {
  let authorization = '';

  const token = getStoredToken();
  const isValidToken = isTokenValid(token);
  if (isValidToken) {
    authorization = token;
  }

  return {
    headers: {
      authorization,
    },
  };
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: clientState,
});

const configureGraphQL = ({ graphqlUrl }) => {
  const apollo = new ApolloClient({
    cache,

    link: ApolloLink.from([
      stateLink,
      authLink,
      new HttpLink({
        uri: graphqlUrl,
      }),
    ]),
  });

  return apollo;
};

export default configureGraphQL;
