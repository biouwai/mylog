/**
 * @description user相关路由
 * @author 比欧外
 */

const router = require("koa-router")();
const { isUserExist } = require("../../controller/user");

router.prefix("/api/user");

router.get("/", async (ctx, next) => {
  ctx.body = {
    s: "s",
  };
});

router.post("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.body;
  // 调用controller层的user的处理函数
  ctx.body = await isUserExist(userName);
});

module.exports = router;
