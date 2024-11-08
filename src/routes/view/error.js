/**
 * @author 比欧外
 * @description error、404页面
 */

const router = require("koa-router")();

// error
router.get("/error", async (ctx, next) => {
  await ctx.render("error");
});

//404
router.get("*", async (ctx, next) => {
  await ctx.render("404");
});

module.exports = router;
