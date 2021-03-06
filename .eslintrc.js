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
    node: true,
  },

  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:json/recommended',
    // Prettier is last because it overrides previous configs!
    'prettier',
  ],

  globals: {
    artifacts: true,
  },

  // Include .dotfiles when linting.
  ignorePatterns: ['!configs/.*.js'],

  overrides: [
    {
      files: './scripts/**/*.js',
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
      },
    },
    {
      env: {
        'cypress/globals': true,
      },
      extends: 'plugin:cypress/recommended',
      files: ['./tests/suites/e2e/**/*.js', './tests/configs/cypress.setup.js'],
    },
    {
      env: {
        jest: true,
      },
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/dom',
        'plugin:testing-library/react',
      ],
      files: [
        './tests/mocks/**/*.{js,jsx}',
        './tests/suites/integration/**/*.{js,jsx}',
        './tests/suites/unit/**/*.{js,jsx}',
        './tests/configs/jest.setup.js',
      ],
    },
  ],

  // Lint experimental and non-standard syntax.
  parser: 'babel-eslint',

  rules: {
    'react/jsx-props-no-spreading': [
      'error',
      {
        exceptions: ['Component', 'Route'],
      },
    ],
  },
};

module.exports = config;
