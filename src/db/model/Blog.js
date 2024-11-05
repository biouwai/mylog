/**
 * @description 创建的博客表
 * @author 比欧外
 */

const seq = require("../seq");

const { INTEGER, STRING, TEXT } = require("../types");

// users
const Blog = seq.define("blog", {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: "所属用户ID",
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: "微博内容",
  },
  picture: {
    type: STRING,
    comment: "微博图片",
  },
});

module.exports = Blog;
