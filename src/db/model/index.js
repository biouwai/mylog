/**
 * @description 统一的导出文件
 * @author 比欧外
 */

const User = require("../model/User");
const Blog = require("../model/Blog");

Blog.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  User,
};
