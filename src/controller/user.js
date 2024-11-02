/**
 * @description user接口的相关处理逻辑
 * @author 比欧外
 */
const { getUserInfo, createUser } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  registerFailInfo,
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

module.exports = {
  register,
  isUserExist,
};
