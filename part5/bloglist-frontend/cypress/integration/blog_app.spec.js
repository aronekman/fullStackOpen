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
      cy.get('#username').type('root');
      cy.get('#password').type('wrong password');
      cy.get('#login-button').click();
      cy.contains('wrong username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'root' });
    });
    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title-input').type('test book');
      cy.get('#author-input').type('test author');
      cy.get('#url-input').type('testUrl.com');
      cy.get('form').contains('create').click();
      cy.contains('a new blog test book by test author added').should(
        'have.css',
        'color',
        'rgb(0, 128, 0)'
      );
      cy.contains('test book test author');
      cy.contains('view').click();
      cy.contains('testUrl.com');
      cy.contains('likes 0');
    });
  });
});
