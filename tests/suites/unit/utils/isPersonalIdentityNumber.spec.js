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

import { isPersonalIdentityNumber } from '../../../../packages/utils';

it('should validate the type', () => {
  expect(() => isPersonalIdentityNumber(190001012020)).toThrow();
  expect(() => isPersonalIdentityNumber('190001012020'))
    .not
    .toThrow();
});

it('should validate the length', () => {
  expect(isPersonalIdentityNumber('19000101202')).toBe(false);
  expect(isPersonalIdentityNumber('000101202')).toBe(false);
  expect(isPersonalIdentityNumber('190001012020')).toBe(true);
});

it('should validate the date', () => {
  expect(isPersonalIdentityNumber('190001992020')).toBe(false);
  expect(isPersonalIdentityNumber('0001992020')).toBe(false);
  expect(isPersonalIdentityNumber('190001012020')).toBe(true);
});

it('should validate the checksum', () => {
  expect(isPersonalIdentityNumber('190001012029')).toBe(false);
  expect(isPersonalIdentityNumber('0001012029')).toBe(false);
  expect(isPersonalIdentityNumber('190001012020')).toBe(true);
});
