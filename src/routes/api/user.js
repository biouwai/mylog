/**
 * @description user相关路由
 * @author 比欧外
 */

const router = require("koa-router")();
const { isUserExist, register, login } = require("../../controller/user");
const userValidate = require("../../validator/user");
const { genValidator } = require("../../middlewares/validator");

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

module.exports = router;
