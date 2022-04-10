const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((previous, current) => previous + current.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
