/** Returns all pages as a collection. */
const getAllPages = collection => {
  return collection.getFilteredByGlob('./src/pages/*.md');
};

/** Returns all blog posts as a collection. */
const getAllPosts = collection => {
  const posts = collection.getFilteredByGlob('./src/posts/*.md');
  return posts.reverse();
};

module.exports = {
  getAllPages,
  getAllPosts
};
