const { loginCheck, loginRedirect } = require("../middlewares/loginCheck");

const router = require("koa-router")();

router.get("/", loginRedirect, async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/json", loginCheck, async (ctx, next) => {
  const session = ctx.session;
  if (!session.viewNum) {
    session.viewNum = 0;
  }
  session.viewNum++;
  ctx.body = {
    title: session.viewNum,
  };
});

module.exports = router;
