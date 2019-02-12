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
  const { secret, time } = options;

  const data = JSON.stringify({
    date: Date.now(),
    id,
  });

  const aes = new AES();
  const encryptedData = aes.encrypt(data, secret);

  const token = jwt.sign({
    data: encryptedData,
  }, secret, {
    expiresIn: time,
  });

  return token;
};

const verify = (token, options) => {
  const { secret, time } = options;

  const payload = jwt.verify(token, secret, {
    algorithms: [
      'HS256',
    ],
    maxAge: time,
  });

  // const aes = new AES();
  // const decryptedData = aes.decrypt(payload.data, secret);

  return payload;
};

const authenticate = (user, tokenOptions) => {
  const { name, personalNumber } = user;

  if (!name) {
    throw new Error('authenticate() error!');
  }

  const token = sign(personalNumber, tokenOptions);

  return {
    token,
  };
};

const isAuthenticated = (ctx, tokenOptions) => {
  let isTokenValid = false;

  const token = ctx.header.authorization;
  if (token) {
    try {
      isTokenValid = !!verify(token, tokenOptions);
    } catch (error) {
      isTokenValid = false;
    }
  }

  return isTokenValid;
};

const validate = (token, tokenOptions) => {
  let isTokenValid = false;

  try {
    isTokenValid = !!verify(token, tokenOptions);
  } catch (error) {
    isTokenValid = false;
  }

  return isTokenValid;
};

const tokenModel = {
  authenticate,
  isAuthenticated,
  validate,
};

module.exports = tokenModel;
