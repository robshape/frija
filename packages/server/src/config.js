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

const configureConfig = (env) => {
  const missingEnvironmentVariables = [
    // Environment variables that are used by the app.
    'GRAPHQL_PORT',
    'TOKEN_SECRET',
    'TOKEN_TIME',
  ].filter((ev) => !env[ev]);
  if (missingEnvironmentVariables.length) {
    throw new Error(`Missing environment variables: ${missingEnvironmentVariables.join(', ')}`);
  }

  return {
    graphqlPort: env.GRAPHQL_PORT,
    token: {
      secret: env.TOKEN_SECRET,
      time: env.TOKEN_TIME,
    },
  };
};

module.exports = configureConfig;
