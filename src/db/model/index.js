/**
 * @description 统一的导出文件
 * @author 比欧外
 */

const User = require("../model/User");
const Blog = require("../model/Blog");
const UserRelation = require("../model/UserRelation");

Blog.belongsTo(User, {
  foreignKey: "userId",
});

UserRelation.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(UserRelation, {
  foreignKey: "followerId",
});

Blog.belongsTo(UserRelation, {
  foreignKey: "userId",
  targetKey: "followerId",
});

module.exports = {
  User,
  Blog,
  UserRelation,
};
