/**
 * @description 博客相关页面
 * @author 比欧外
 */

const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginCheck");
const { PAGE_SIZE } = require("../../conf/constant");
const { getProfileBlogList } = require("../../controller/blog-profile");
// 首页
router.get("/", loginRedirect, async (ctx, next) => {
  await ctx.render("index");
});

// 个人主页
router.get("/profile", loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  ctx.redirect(`/profile/${userName}`);
});

router.get("/profile/:userName", loginRedirect, async (ctx, next) => {
  const { userName: curUserName } = ctx.params;
  // 获取微博第一页数据
  const result = await getProfileBlogList({
    userName: curUserName,
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;
  const { userInfo } = ctx.session;
  await ctx.render("profile", {
    userData: {
      userInfo,
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
  });
});

module.exports = router;
