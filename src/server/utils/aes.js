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

const forge = require('node-forge');

module.exports = class AES {
  constructor() {
    this.options = {
      iterationCount: 10000,
      keyLength: 16, // 16 will use AES-128. 32 will use AES-256.
    };
  }

  decrypt(data, password) {
    const { iterationCount, keyLength } = this.options;

    const [ciphertext64, iv64, salt64] = data.split('.');

    const ciphertext = forge.util.decode64(ciphertext64);
    const buffer = forge.util.createBuffer(ciphertext);

    const salt = forge.util.decode64(salt64);
    const key = forge.pkcs5.pbkdf2(password, salt, iterationCount, keyLength);

    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    const iv = forge.util.decode64(iv64);
    decipher.start({
      iv,
    });
    decipher.update(buffer);
    decipher.finish();

    return decipher.output.toString('utf8');
  }

  encrypt(plaintext, password) {
    const { iterationCount, keyLength } = this.options;

    const buffer = forge.util.createBuffer(plaintext, 'utf8');

    const salt = forge.random.getBytesSync(16);
    const key = forge.pkcs5.pbkdf2(password, salt, iterationCount, keyLength);

    const cipher = forge.cipher.createCipher('AES-CBC', key);
    const iv = forge.random.getBytesSync(16);
    cipher.start({
      iv,
    });
    cipher.update(buffer);
    cipher.finish();

    const ciphertext = cipher.output.getBytes();

    const ciphertext64 = forge.util.encode64(ciphertext);
    const iv64 = forge.util.encode64(iv);
    const salt64 = forge.util.encode64(salt);
    return `${ciphertext64}.${iv64}.${salt64}`;
  }
};
