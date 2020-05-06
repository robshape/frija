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

import serverTestClient from '../utils/serverTestClient';

it('should set security headers', async () => {
  const { request } = serverTestClient();
  const { header } = await request.get('/');

  expect(header['referrer-policy']).toBe('no-referrer');
  expect(header['strict-transport-security']).toBe('max-age=15552000; includeSubDomains');
  expect(header['x-content-type-options']).toBe('nosniff');
  expect(header['x-dns-prefetch-control']).toBe('off');
  expect(header['x-download-options']).toBe('noopen');
  expect(header['x-frame-options']).toBe('DENY');
  expect(header['x-permitted-cross-domain-policies']).toBe('none');
  expect(header['x-xss-protection']).toBe('1; mode=block');
});
