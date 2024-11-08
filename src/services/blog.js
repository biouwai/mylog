/**
 * @description blog操作
 * @author 比欧外
 */
const { User, Blog, UserRelation } = require("../db/model/index");
const { formatUser, formatBlog } = require("./_format");

/**
 * 创建博客
 * @param {Object} param0 博客内容
 * @returns
 */
const createBlog = async ({ userId, content, image }) => {
  const result = await Blog.create({ userId, content, image });
  return result.dataValues;
};

/**
 * 获取博客列表
 * @param {Obejct} param0 用户账号及列表大小
 * @returns
 */
const getBlogList = async ({ userName, pageIndex = 0, pageSize = 10 }) => {
  const whereUserOpts = {};
  if (userName) {
    whereUserOpts.userName = userName;
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
        where: whereUserOpts,
      },
    ],
  });
  let blogList = result.rows.map((row) => row.dataValues);

  blogList = blogList.map((blog) => {
    const user = blog.user.dataValues;
    blog.user = formatUser(user);
    return blog;
  });

  return {
    count: result.count,
    blogList,
  };
};

/**
 * 获取关注者的微博列表（首页）
 * @param {Object} param0 查询条件 { userId, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
      },
      {
        model: UserRelation,
        attributes: ["userId", "followerId"],
        where: { userId },
      },
    ],
  });

  // 格式化数据
  let blogList = result.rows.map((row) => row.dataValues);
  blogList = formatBlog(blogList);
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues);
    return blogItem;
  });

  return {
    count: result.count,
    blogList,
  };
}

module.exports = {
  createBlog,
  getBlogList,
  getFollowersBlogList,
};
