/**
 * @description 创建的博客表
 * @author 比欧外
 */

const seq = require("../seq");

const { INTEGER } = require("../types");

// userRelation
const UserRelation = seq.define("userRelation", {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: "关注人ID(粉丝)",
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: "被关注人ID",
  },
});

module.exports = UserRelation;
