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

const config = {
  collectCoverageFrom: [
    './src/**/*.{js,jsx}',
    '!./src/client/index.jsx',
    '!./src/ethereum/**',
    '!./src/server/index.js',
  ],
  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
    // Map to exact same copy of these dependencies.
    '^react$': '<rootDir>/src/client/node_modules/react/',
    '^react-router$': '<rootDir>/src/client/node_modules/react-router/',
  },
  rootDir: '../',
  setupFilesAfterEnv: [
    '<rootDir>/tests/jest.setup.js',
  ],
  testRegex: 'tests/.+\\.spec\\.(js|jsx)$',
};

module.exports = config;
