const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const blog = require('../models/blog');

let authorization;

beforeAll(async () => {
  await User.deleteMany({});
  const user = {
    username: 'testUser',
    name: 'testUser',
    password: 'testPassword',
  };
  await api.post('/api/users').send(user);
  const login = await api.post('/api/login').send(user);
  authorization = { Authorization: `Bearer ${login.body.token}` };
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const user = await User.findOne();
  const blogs = helper.initialBlogs.map(
    blog => new Blog({ ...blog, user: user._id })
  );
  await Blog.insertMany(blogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set(authorization)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').set(authorization);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs').set(authorization);
    const blogs = response.body;
    blogs.map(blog => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    expect(blogsAtEnd).toContainEqual(
      expect.objectContaining({
        id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
      })
    );
  });

  test('likes property will default to 0 if missing', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(authorization)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const addedBlog = blogsAtEnd.find(
      blog => blog.id === '5a422bc61b54a676234d17fc'
    );
    expect(addedBlog.likes).toBe(0);
  });

  test('fails with status code 400 if data title and url are missing', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      author: 'Robert C. Martin',
      __v: 0,
    };

    await api.post('/api/blogs').send(newBlog).set(authorization).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
  test('fails with status 401 Unauthorized if token is not provided', async () => {
    const newBlog = {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).set(authorization);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(r => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('succeeds with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 10,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .set(authorization)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const updatedBlog = blogsAtEnd.find(r => r.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(newBlog.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
