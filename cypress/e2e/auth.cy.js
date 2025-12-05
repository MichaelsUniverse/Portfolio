it('Sign Up', function() {
  cy.visit('http://localhost:5173')
  cy.get('#root a[href="/login"]').click();
  cy.get('#root button[type="button"]').click();
  cy.get('[name="name"]').click();
  cy.get('[name="name"]').type('test');
  cy.get('[name="email"]').type('test@test.com');
  cy.get('[name="password"]').click();
  cy.get('[name="password"]').type('test');
  cy.get('#root button').click();

});

it('Login', function() {
  cy.visit('http://localhost:5173')
  cy.get('#root a[href="/login"]').click();
  cy.get('[name="email"]').click();
  cy.get('[name="email"]').type('test@test.com');
  cy.get('[name="password"]').type('test');
  cy.get('#root button[type="submit"]').click();
});

it('Logout', function() {
  cy.visit('http://localhost:5173')
  cy.get('#root a[href="/login"]').click();
  cy.get('[name="email"]').click();
  cy.get('[name="email"]').type('test@test.com');
  cy.get('[name="password"]').type('test{enter}');
  cy.get('#root button[type="submit"]').click();
  cy.get('#root div.auth-link a').click();
  
});