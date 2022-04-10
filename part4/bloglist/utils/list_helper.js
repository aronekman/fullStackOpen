const _ = require('lodash');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((previous, current) => previous + current.likes, 0);
};

const favoriteBlog = blogs => {
  const favorite = _.maxBy(blogs, o => o.likes);
  return _.pick(favorite, ['title', 'author', 'likes']);
};

const mostBlogs = blogs => {
  const result = _.chain(blogs).countBy('author').entries().max().value();
  return result ? { author: result[0], blogs: result[1] } : {};
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
