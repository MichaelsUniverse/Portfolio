it('Load Projects', function() {
    cy.visit('http://localhost:5173')
    cy.get('#root a[href="/login"]').click();
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('test@test.com');
    cy.get('[name="password"]').type('test{enter}');
    cy.get('#root button[type="submit"]').click();
    cy.get('#root a[href="/projects"]').click();

});

it('Edit Project', function() {
    cy.intercept('GET', '/api/projects').as('getProjects');

    cy.visit('http://localhost:5173')
    cy.get('#root a[href="/login"]').click();
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('test@test.com');
    cy.get('[name="password"]').type('test{enter}');
    cy.get('#root button[type="submit"]').click();
    cy.wait(1000)
    cy.get('#root a[href="/projects"]').click();
    cy.wait('@getProjects');
    cy.contains('Portfolio').should('be.visible');

    cy.get('#root div:nth-child(3) div.project-actions a:nth-child(1)').click();
    cy.get('[name="title"]').click();
    cy.get('[name="title"]').type(' Site');
    cy.get('#root button').click();
    cy.get('#root div:nth-child(3) div.project-actions a:nth-child(1)').click();
    cy.get('[name="title"]').click();
    cy.get('[name="title"]').clear();
    cy.get('[name="title"]').type('Daily Crumb Site');
    cy.get('#root button').click();
    cy.get('#root div.nav-links > a:nth-child(1)').click();
    cy.get('#root div.auth-link a').click();
});

it('Create/Delete Project', function() {
    cy.visit('http://localhost:5173')
    cy.get('#root a[href="/login"]').click();
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('test@test.com');
    cy.get('[name="password"]').type('test{enter}');
    cy.get('#root button[type="submit"]').click();
    cy.wait(1000)

    cy.get('#root a[href="/projects"]').click();
    cy.get('#root button.new-project-btn').click();
    cy.get('[name="title"]').click();
    cy.get('[name="title"]').type('New Project Made');
    cy.get('#root label[for="description"] p').click();
    cy.get('#description').click();
    cy.get('#description').type('This is a new Project');
    cy.get('[name="techStack"]').click();
    cy.get('[name="techStack"]').type('React, Mongo, Cypress');
    cy.get('#root button').click();
    cy.get('#root div:nth-child(7) a:nth-child(2)').click();
    cy.get('#root div.nav-links > a:nth-child(1)').click();
    cy.get('#root div.auth-link a').click();

});