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

const helmet = require('koa-helmet');
const Koa = require('koa');

const configureGraphQL = require('./graphql');
const configureRoutes = require('./routes');

const configureApp = (config) => {
  const koa = new Koa();
  configureGraphQL(koa, config);

  koa.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url}`); // eslint-disable-line no-console
    await next();
  });

  koa.use(helmet({
    dnsPrefetchControl: true,
    frameguard: {
      action: 'deny',
    },
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: {
      policy: 'no-referrer',
    },
    xssFilter: true,
  }));

  configureRoutes(koa);

  return koa.callback();
};

module.exports = configureApp;
