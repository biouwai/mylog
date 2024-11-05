/**
 * @description 用户相关页面
 * @author 比欧外
 */

const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginCheck");

const isLogin = (ctx) => {
  let data = {
    userInfo: false,
    userName: null,
  };
  const userInfo = ctx.session.userInfo;
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName,
    };
  }
  return data;
};

router.get("/register", async (ctx, next) => {
  await ctx.render("register", isLogin(ctx));
});

router.get("/login", async (ctx, next) => {
  await ctx.render("login", isLogin(ctx));
});

router.get("/setting", loginRedirect, async (ctx, next) => {
  await ctx.render("setting", ctx.session.userInfo);
});

module.exports = router;
