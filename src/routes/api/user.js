/**
 * @description user相关路由
 * @author 比欧外
 */

const router = require("koa-router")();
const { isUserExist, register } = require("../../controller/user");

router.prefix("/api/user");

// 用户注册
router.post("/register", async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  // 调用controller层的user的处理函数
  ctx.body = await register({ userName, password, gender });
});

// 用户名是否存在
router.post("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.body;
  // 调用controller层的user的处理函数
  ctx.body = await isUserExist(userName);
});

module.exports = router;
