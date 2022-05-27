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
    describe('and some blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'title1',
          author: 'author1',
          url: 'url1.com',
          likes: 0,
        });
        cy.createBlog({
          title: 'title2',
          author: 'author2',
          url: 'url2.com',
          likes: 2,
        });
        cy.createBlog({
          title: 'title3',
          author: 'author3',
          url: 'url3.com',
          likes: 1,
        });
      });
      it('one of those can be liked', function () {
        cy.contains('title1').parent().as('theBlog');

        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('like').click();
        cy.get('@theBlog').should('contain', 'likes 1');
      });
      it('one of those can be deleted', function () {
        cy.contains('title2').parent().as('theBlog');

        cy.get('@theBlog').contains('view').click();
        cy.get('@theBlog').contains('remove').click();
        cy.get('.blog').should($blog => {
          expect($blog).to.have.length(2);
        });
      });
      it('other users can not remove blogs', function () {
        const user2 = {
          name: 'other user',
          username: 'user2',
          password: 'pass2',
        };
        cy.request('POST', 'http://localhost:3003/api/users/', user2);

        cy.contains('logout').click();
        cy.login({ username: 'user2', password: 'pass2' });
        cy.wait(500);
        cy.get('button:contains(view)').click({ multiple: true });
        cy.get('button').contains('remove').should('not.exist');
      });
      it('they are ordered according to likes ', function () {
        cy.get('.blog').eq(0).should('contain', 'title2');
        cy.get('.blog').eq(1).should('contain', 'title3');
        cy.get('.blog').eq(2).should('contain', 'title1');
        cy.get('button:contains(view)').click({ multiple: true });
        cy.contains('title1').parent().contains('like').click();
        cy.wait(500);
        cy.contains('title1').parent().contains('like').click();
        cy.wait(500);
        cy.contains('title1').parent().contains('like').click();
        cy.wait(500);
        cy.get('.blog').eq(0).should('contain', 'title1');
      });
    });
  });
});
