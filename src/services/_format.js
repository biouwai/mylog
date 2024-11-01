/**
 * @description 格式化工具
 * @author 比欧外
 */

const { format } = require("mysql2");
const { DEFAULT_PICTURE } = require("../conf/constant");

/**
 * 设置默认头像
 * @param {Object} user
 * @returns
 */
const _formatUserPicture = (user) => {
  if (!user?.picture) {
    user.picture = DEFAULT_PICTURE;
  }
  return user;
};

/**
 * 格式化用户参数
 * @param {Array|Object} list //用户列表或三个用户
 */
const formatUser = (list) => {
  if (!list) {
    return list;
  }
  // 用户列表
  if (list instanceof Array) {
    return list.map(_formatUserPicture);
  }
  // 单个用户
  return _formatUserPicture(list);
};

module.exports = {
  formatUser,
};
