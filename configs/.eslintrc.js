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

const config = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },

  extends: [
    'airbnb',
    'plugin:json/recommended',
    'plugin:react-hooks/recommended',
  ],

  globals: {
    artifacts: true,
  },

  // Include .dotfiles when linting!
  ignorePatterns: [
    '!configs/.*.js',
  ],

  overrides: [
    {
      files: './scripts/**/*.js',
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
      },
    },
    {
      extends: [
        'plugin:cypress/recommended',
      ],
      files: './tests/e2e/**/*.js',
      plugins: [
        'cypress',
      ],
    },
    {
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
      ],
      files: './tests/+(integration|unit)/**/*.{js,jsx}',
      plugins: [
        'jest',
      ],
    },
  ],

  plugins: [
    'json',
    'react-hooks',
  ],

  rules: {
    'react/jsx-props-no-spreading': ['error', {
      exceptions: [
        'Component',
        'Route',
      ],
    }],
  },
};

module.exports = config;