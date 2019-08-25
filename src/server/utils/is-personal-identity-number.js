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

const isLuhnChecksumValid = (number) => {
  const digits = number
    .split('')
    .reverse()
    .map((digit) => Number.parseInt(digit, 10));
  const lastDigit = digits.splice(0, 1)[0];

  const sum = digits.reduce((acc, cur, idx) => {
    if (idx % 2 !== 0) {
      return acc + cur;
    }

    return acc + ((cur * 2) % 9) || 9;
  }, 0);

  return (sum + lastDigit) % 10 === 0;
};

const isPersonalIdentityNumber = (number) => {
  // Is it 10 (yymmddxxxx) or 12 (yyyymmddxxxx) digits?
  if (number.length !== 10
  && number.length !== 12) {
    return false;
  }

  // Is the date valid?
  const dateNumber = number.length === 12 // yymmdd
    ? number.substring(2, 8)
    : number.substring(0, 6);
  const dateFormat = `${dateNumber.substring(0, 2)}-${dateNumber.substring(2, 4)}-${dateNumber.substring(4, 6)}`; // yy-mm-dd
  const date = Date.parse(dateFormat);
  if (Number.isNaN(date)) {
    return false;
  }

  // Is the Luhn checksum valid?
  const luhnNumber = number.length === 12 // yymmddxxxx
    ? number.substring(2)
    : number;
  if (!isLuhnChecksumValid(luhnNumber)) {
    return false;
  }

  return true;
};

module.exports = isPersonalIdentityNumber;
