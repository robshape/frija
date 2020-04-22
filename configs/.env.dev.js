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

const config = {
  GRAPHQL_PORT: '3000',
  GRAPHQL_URL: 'https://localhost:3000/graphql',
  SSL_CERT: './server.crt',
  SSL_KEY: './server.key',
  TOKEN_SECRET: 'c3e2a70e-ba85-4120-ba4d-1adc9c3d64c9',
  TOKEN_TIME: '10m',
};

module.exports = config;
