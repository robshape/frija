/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2018 Frija contributors.

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

require('dotenv').config();
const fs = require('fs');
const https = require('https');

const app = require('./app');

https // https://github.com/apollographql/apollo-server/issues/1533/
  .createServer({
    cert: fs.readFileSync(process.env.CERT),
    key: fs.readFileSync(process.env.KEY),
  }, app)
  .listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`); // eslint-disable-line no-console
    console.log(`GraphQL listening on :${process.env.PORT}/graphql/`); // eslint-disable-line no-console
  });
