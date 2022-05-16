describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'test user',
      username: 'root',
      password: 'root',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('root');
      cy.get('#login-button').click();
      cy.contains('test user logged in');
      cy.contains('logout').click();
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.get('#login-button').click();
      cy.contains('wrong username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });
  });
});
