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

const { AuthenticationError } = require('apollo-server-koa');
const { DataSource } = require('apollo-datasource');

const jwt = require('../../utils/jwt');

class TokenDataSource extends DataSource {
  constructor({ token }) {
    super();

    this.tokenConfig = token;
  }

  authenticate(user) {
    return {
      token: jwt.sign(user.personalIdentityNumber, this.tokenConfig),
    };
  }

  isAuthenticated(ctx) {
    let isTokenValid = false;

    const token = ctx.header.authorization;
    if (token) {
      try {
        isTokenValid = !!jwt.verify(token, this.tokenConfig);
      } catch (error) {
        isTokenValid = false;
      }
    }

    return isTokenValid;
  }

  validate(token) {
    try {
      return !!jwt.verify(token, this.tokenConfig);
    } catch (error) {
      throw new AuthenticationError('Invalid token.');
    }
  }
}

module.exports = TokenDataSource;
