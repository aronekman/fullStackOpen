const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((previous, current) => previous + current.likes, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {};
  const favorite = blogs.reduce((previous, current) =>
    previous.likes > current.likes ? previous : current
  );
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
