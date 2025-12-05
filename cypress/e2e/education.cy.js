it('Show Education', function() {
    cy.visit('http://localhost:5173')
    cy.get('#root a[href="/login"]').click();
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('test@test.com');
    cy.get('[name="password"]').type('test{enter}');
    cy.get('#root button[type="submit"]').click();
    cy.wait(1000)
    cy.get('#root a[href="/education"]').click();
    
});

it('Edit Education', function() {
    cy.visit('http://localhost:5173')
    cy.get('#root a[href="/login"]').click();
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('test@test.com');
    cy.get('[name="password"]').type('test{enter}');
    cy.get('#root button[type="submit"]').click();
    cy.wait(1000)
    cy.get('#root a[href="/education"]').click();
    cy.get('#root div:nth-child(3) a:nth-child(2)').click();
    cy.get('[name="degree"]').click();
    cy.get('[name="degree"]').type('No Degree');
    cy.get('#root button').click();
    cy.get('#root div:nth-child(3) a:nth-child(2)').click();
    cy.get('#root section.project-details').click();
    cy.get('[name="degree"]').clear();
    cy.get('#root button').click();
    cy.get('#root div.nav-links > a:nth-child(1)').click();
    cy.get('#root div.auth-link a').click();
});

it('Create/Delete Education', function() {
      cy.visit('http://localhost:5173')
      cy.get('#root a[href="/login"]').click();
      cy.get('[name="email"]').click();
      cy.get('[name="email"]').type('test@test.com');
      cy.get('[name="password"]').type('test{enter}');
      cy.get('#root button[type="submit"]').click();
      cy.wait(1000)
      cy.get('#root a[href="/education"]').click();
      cy.get('#root button.new-education-btn').click();
      cy.get('[name="title"]').click();
      cy.get('[name="title"]').type('Electrical Engineering');
      cy.get('[name="degree"]').click();
      cy.get('[name="degree"]').type('Masters');
      cy.get('[name="school"]').click();
      cy.get('[name="school"]').type('Electrix Academy');
      cy.get('[name="gpa"]').click();
      cy.get('[name="gpa"]').type('3.4');
      cy.get('[name="startDate"]').type('2000-12-23');
      cy.get('[name="endDate"]').type('2009-12-10');
      cy.get('#root button').click();
      cy.wait(1000)
      cy.get('#root div:nth-child(4) a:nth-child(3)').click();
      cy.get('#root div.nav-links > a:nth-child(1)').click();
      cy.get('#root div.auth-link a').click();
});