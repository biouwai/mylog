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

  // 登陆接口加上密码
  if (password) {
    Object.assign(whereOpt, { password });
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

/**
 * 创建用户
 * @param {string} userName  用户名
 * @param {string} password 密码
 * @param {number} gender 性别：1-男、2-女、3-保密
 * @param {string} gender 昵称
 * @returns
 */
const createUser = async ({ userName, password, gender = 3, Nickname }) => {
  // 插入
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: Nickname ? Nickname : userName,
  });
  // 看看数据结果
  return result.dataValues;
};

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName,
    },
  });
  // result 删除的行数
  return result > 0;
}

module.exports = {
  createUser,
  getUserInfo,
  deleteUser,
};
