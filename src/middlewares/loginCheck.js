/**
 * @description 登陆中间件
 * @author 比欧外
 */

const { ErrorModel } = require("../model/ResModel");
const { loginCheckFailInfo } = require("../model/ErrorModel");

/**
 * 登陆API中间件
 * @param {Object} ctx
 * @param {Function} next
 * @returns
 */
const loginCheck = async (ctx, next) => {
  if (ctx.session?.userInfo) {
    await next();
    return;
  }
  ctx.body = new ErrorModel(loginCheckFailInfo);
};

/**
 * 登陆路由中间件
 * @param {Object} ctx
 * @param {Function} next
 * @returns
 */
const loginRedirect = async (ctx, next) => {
  if (ctx.session?.userInfo) {
    await next();
    return;
  }
  const url = ctx.url;
  ctx.redirect(`/login?url=${url}`);
};

module.exports = {
  loginCheck,
  loginRedirect,
};
