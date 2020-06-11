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
    './packages/**/*.{js,jsx}',

    // Do not collect coverage from:
    '!./packages/client/configs/**',
    '!./packages/client/dist/**',
    '!./packages/client/src/index.jsx',

    '!./packages/ethereum/**',

    '!./packages/server/src/index.js',
  ],

  moduleNameMapper: {
    '\\.scss$': 'identity-obj-proxy',
  },

  rootDir: '../../',

  setupFilesAfterEnv: [
    '<rootDir>/tests/configs/jest.setup.js',
  ],

  testMatch: [
    '<rootDir>/tests/suites/integration/**/*.spec.{js,jsx}',
    '<rootDir>/tests/suites/unit/**/*.spec.{js,jsx}',
  ],

  testTimeout: 10000, // Update to `@testing-library/user-event` causes timeouts.

  transform: {
    '\\.(js|jsx)$': ['babel-jest', {
      configFile: './tests/configs/babel.config.js',
    }],
  },
};

module.exports = config;
