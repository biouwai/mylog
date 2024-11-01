const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/register", async (ctx, next) => {
  await ctx.render("register");
});

router.get("/json", async (ctx, next) => {
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
