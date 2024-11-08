/**
 * @description 格式化工具
 * @author 比欧外
 */

const { DEFAULT_PICTURE } = require("../conf/constant");
const { timeFormat } = require("../utils/dt");

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

/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt);
  obj.updatedAtFormat = timeFormat(obj.updatedAt);
  return obj;
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content;

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    /@(.+?)\s-\s(\w+?)\b/g,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`;
    }
  );

  return obj;
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
  if (list == null) {
    return list;
  }

  if (list instanceof Array) {
    // 数组
    return list.map(_formatDBTime).map(_formatContent);
  }
  // 对象
  let result = list;
  result = _formatDBTime(result);
  result = _formatContent(result);
  return result;
}

module.exports = {
  formatUser,
  formatBlog,
};
