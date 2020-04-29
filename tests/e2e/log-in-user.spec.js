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

it('should log in a user', () => {
  cy.visit('/', {
    onBeforeLoad: (win) => {
      win.sessionStorage.clear();
    },
  });
  cy.get('[data-testid="app"]')
    .should('be.visible');

  cy.url()
    .should('include', '/authenticate');
  cy.contains('p', 'Välkommen till Frija')
    .should('not.exist');

  cy.contains('label', 'Personnummer')
    .should('be.visible')
    .find('input[placeholder="ååååmmddxxxx"]')
    .should('be.visible')
    .should('have.value', '')
    .type('190001012020')
    .should('have.value', '190001012020');
  cy.contains('button', 'Fortsätt')
    .should('be.visible')
    .click();

  cy.contains('div', 'Väntar på svar från Mobilt BankID... Vänligen starta BankID-appen i din mobila enhet.')
    .should('be.visible');

  cy.url()
    .should('not.include', '/authenticate');
  cy.contains('p', 'Välkommen till Frija')
    .should('be.visible');
});
