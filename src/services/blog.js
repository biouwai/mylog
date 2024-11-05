/**
 * @description blog操作
 * @author 比欧外
 */

const Blog = require("../db/model/Blog");

const createBlog = async ({ userId, content, image }) => {
  const result = await Blog.create({ userId, content, image });
  return result.dataValues;
};

module.exports = {
  createBlog,
};
