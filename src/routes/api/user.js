/**
 * @description user相关路由
 * @author 比欧外
 */

const router = require("koa-router")();
const {
  isUserExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
} = require("../../controller/user");
const userValidate = require("../../validator/user");
const { genValidator } = require("../../middlewares/validator");
const { loginCheck } = require("../../middlewares/loginCheck");
const { isTest } = require("../../utils/env");

router.prefix("/api/user");

// 用户名是否存在
router.post("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.body;
  // 调用controller层的user的处理函数
  ctx.body = await isUserExist(userName);
});

// 用户注册
router.post("/register", genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  // 调用controller层的user的处理函数
  ctx.body = await register({ userName, password, gender });
});

// 用户登陆
router.post("/login", genValidator(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  // 调用controller层的user的处理函数
  ctx.body = await login({ ctx, userName, password });
});

// 删除测试账号
router.post("/delete", loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试账号登录之后，删除自己
    const { userName } = ctx.session.userInfo;
    ctx.body = await deleteCurUser(userName);
  }
});

// 修改个人信息
router.patch("/changeInfo", loginCheck, async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body;
  ctx.body = await changeInfo(ctx, { nickName, city, picture });
});

// 修改密码
router.patch(
  "/changePassword",
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body;
    const { userName } = ctx.session.userInfo;
    ctx.body = await changePassword(userName, password, newPassword);
  }
);

// 退出登陆
router.post("/logout", loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx);
});

module.exports = router;
