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

const compress = require('koa-compress');
const helmet = require('koa-helmet');
const Koa = require('koa');
const pino = require('koa-pino-logger');

const configureGraphQL = require('./graphql');
const configureRoutes = require('./routes');

const configureApp = (config) => {
  const koa = new Koa();
  const logger = pino({
    enabled: process.env.NODE_ENV !== 'test',
  });

  // Order matters. Top middleware wraps subsequent middleware.
  koa.use(logger);
  koa.use(
    helmet({
      contentSecurityPolicy: false,
      frameguard: {
        action: 'deny',
      },
    })
  );
  koa.use(compress());

  configureGraphQL(koa, config);
  configureRoutes(koa);

  return {
    app: koa.callback(),
    logger: logger.logger,
  };
};

module.exports = configureApp;
