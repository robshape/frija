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

it('should load Frija', () => {
  // Root path.
  cy.visitAndAssert('/');

  cy
    .title()
    .should('equal', 'Frija');

  cy
    .contains('h2', 'Hej,')
    .should('be.visible');

  // Path without trailing slash.
  cy.visitAndAssert('/authenticate');

  cy
    .url()
    .should('include', '/authenticate');

  cy
    .contains('h2', 'Hej,')
    .should('be.visible');

  // Path with trailing slash.
  cy.visitAndAssert('/authenticate/');

  cy
    .url()
    .should('not.include', '/authenticate/');
  cy
    .url()
    .should('include', '/authenticate');

  cy
    .contains('h2', 'Hej,')
    .should('be.visible');

  // Path that does not exist.
  cy.visitAndAssert('/doesnotexist/doesnotexist');

  cy
    .url()
    .should('not.include', 'doesnotexist');
  cy
    .url()
    .should('include', '/authenticate');

  cy
    .contains('h2', 'Hej,')
    .should('be.visible');

  // File that does not exist.
  cy.visitAndAssert('/doesnotexist/doesnotexist.png');

  cy
    .url()
    .should('not.include', 'doesnotexist');
  cy
    .url()
    .should('not.include', '.png');
  cy
    .url()
    .should('include', '/authenticate');

  cy
    .contains('h2', 'Hej,')
    .should('be.visible');
});
