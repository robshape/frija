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

import { CONSTANTS } from './enum';

const decodeTokenPayload = (token) => {
  const encodedPayload = token.split('.')[1];
  const payload = atob(encodedPayload);
  return JSON.parse(payload);
};

export const getStoredToken = () => sessionStorage
  .getItem(CONSTANTS.SESSION_STORAGE_KEY_NAME_TOKEN);

const isTokenDateValid = (token) => {
  const date = Date.now() / 1000;
  const { exp } = decodeTokenPayload(token);
  if (date > exp) {
    return false;
  }

  return true;
};

export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  const isDateValid = isTokenDateValid(token);
  if (!isDateValid) {
    return false;
  }

  return true;
};

export const removeStoredToken = () => sessionStorage
  .removeItem(CONSTANTS.SESSION_STORAGE_KEY_NAME_TOKEN);

export const setStoredToken = token => sessionStorage
  .setItem(CONSTANTS.SESSION_STORAGE_KEY_NAME_TOKEN, token);
