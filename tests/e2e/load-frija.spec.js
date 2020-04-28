it('loads Frija', () => {
  cy.visit('/');

  cy.contains('Hej,');
  cy.contains('identifiera dig med Mobilt BankID');
});
