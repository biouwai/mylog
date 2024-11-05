/**
 * @description user接口的相关处理逻辑
 * @author 比欧外
 */
const { getUserInfo, createUser, deleteUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailInfo,
} = require("../model/ErrorModel");
const { doCrypto } = require("../utils/cryp");

/**
 * 判断用户名是否存在
 * @param {string} userName
 */
const isUserExist = async (userName) => {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
};

/**
 * 注册用户
 * @param {string} userName  用户名
 * @param {string} password 密码
 * @param {number} gender 性别：1-男、2-女、3-保密
 * @returns
 */
const register = async ({ userName, password, gender }) => {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }
  try {
    await createUser({ userName, password: doCrypto(password), gender });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
};

/**
 * 登陆
 * @param {Object} ctx  ctx
 * @param {string} userName  用户名
 * @param {string} password 密码
 * @returns
 */
const login = async ({ ctx, userName, password }) => {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (userInfo) {
    ctx.session.userInfo = userInfo;
    return new SuccessModel();
  } else {
    return new ErrorModel(loginFailInfo);
  }
};

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName);
  if (result) {
    // 成功
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo);
}

module.exports = {
  isUserExist,
  register,
  login,
  deleteCurUser,
};
