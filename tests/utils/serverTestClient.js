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

import { ApolloServer } from 'apollo-server-koa';
import { createTestClient } from 'apollo-server-testing';
import request from 'supertest';

import configureApp from '../../packages/server/src/app';
import configureConfig from '../../packages/server/src/config';
import dataSources from '../../packages/server/src/graphql/dataSources';
import resolvers from '../../packages/server/src/graphql/resolvers';
import schemas from '../../packages/server/src/graphql/schemas';

const config = configureConfig({
  GRAPHQL_PORT: 3000,
  TOKEN_SECRET: 'c3e2a70e-ba85-4120-ba4d-1adc9c3d64c9',
  TOKEN_TIME: '10m',
});

const serverTestClient = () => {
  const apolloServer = new ApolloServer({
    dataSources: dataSources(config),
    resolvers,
    typeDefs: schemas,
  });

  const app = configureApp(config);

  return {
    ...createTestClient(apolloServer),
    request: request(app),
  };
};

export default serverTestClient;
