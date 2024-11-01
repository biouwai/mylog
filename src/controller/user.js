/**
 * @description user接口的相关处理逻辑
 * @author 比欧外
 */
const { getUserInfo } = require("../services/user");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { registerUserNameNotExistInfo } = require("../model/ErrorModel");

/**
 * 判断用户名是否存在
 * @param {string} username
 */

const isUserExist = async (userName) => {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
};

module.exports = {
  isUserExist,
};
