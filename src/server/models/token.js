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

const jwt = require('jsonwebtoken');

const AES = require('../utils/aes');

const sign = (id, options) => {
  const { expiresIn, secret } = options;

  const data = JSON.stringify({
    date: Date.now(),
    id,
  });

  const aes = new AES();
  const encryptedData = aes.encrypt(data, secret);

  const token = jwt.sign({
    data: encryptedData,
  }, secret, {
    expiresIn,
  });

  return token;
};

const verify = (token, options) => {
  const { expiresIn, secret } = options;

  const payload = jwt.verify(token, secret, {
    algorithms: [
      'HS256',
    ],
    maxAge: expiresIn,
  });

  // const aes = new AES();
  // const decryptedData = aes.decrypt(payload.data, secret);

  return payload;
};

const isAuthenticated = (ctx, tokenOptions) => {
  const token = ctx.header.authorization;

  return !!(
    token
    && verify(token, tokenOptions)
  );
};

const logIn = (user, tokenOptions) => {
  const { name, personalNumber } = user;

  if (!name) {
    throw new Error('logIn() error!');
  }

  const token = sign(personalNumber, tokenOptions);

  return {
    token,
  };
};

module.exports = {
  isAuthenticated,
  logIn,
};
