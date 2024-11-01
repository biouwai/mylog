/**
 * @description user的数据提取与格式化
 * @author 比欧外
 */

const { formatUser } = require("./_format.js");
const { User } = require("../db/model/index");
/**
 * 获取用户信息
 * @param {string} userName
 * @param {string} password
 */
const getUserInfo = async (userName, password) => {
  // 查询条件
  const whereOpt = { userName };
  if (password) {
    Object.assgin(whereOpt, { password });
  }

  // 查询
  const result = await User.findOne({
    attributes: ["id", "userName", "nickName", "picture", "city"],
    where: whereOpt,
  });
  if (!result) {
    return result;
  }

  const formatRes = formatUser(result.dataValues);
  return formatRes;
};

module.exports = {
  getUserInfo,
};
