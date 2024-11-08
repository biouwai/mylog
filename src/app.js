const path = require("path");
const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");

const { isProd } = require("./utils/env");
const { REDIS_CONF } = require("./conf/db");
const { SESSION_SECRET_KEY } = require("./conf/secret");

// router
const userView = require("./routes/view/user");
const blogView = require("./routes/view/blog");
const userAPIRouter = require("./routes/api/user");
const homeAPIRouter = require("./routes/api/blog-home");
const profileAPIRouter = require("./routes/api/blog-profile");
const squareAPIRouter = require("./routes/api/blog-square");
const utilsAPIRouter = require("./routes/api/utils");
const errorViewRouter = require("./routes/view/error");

// error handler
let onerrorConf = {};
if (isProd) {
  onerrorConf = {
    redirect: "/error",
  };
}
onerror(app, onerrorConf);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));
app.use(require("koa-static")(path.join(__dirname, "..", "uploadFiles")));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// session配置
app.keys = [SESSION_SECRET_KEY];
app.use(
  session({
    key: "weibo.sid", //cookie name
    prefix: "weiob:sess", // redis keys的前缀
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods());
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods());
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods());
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods());
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods());
app.use(userView.routes(), userView.allowedMethods());
app.use(blogView.routes(), blogView.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
