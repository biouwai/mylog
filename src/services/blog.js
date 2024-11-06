/**
 * @description blog操作
 * @author 比欧外
 */
const { User, Blog } = require("../db/model/index");
const { formatUser } = require("../services/_format");

const createBlog = async ({ userId, content, image }) => {
  const result = await Blog.create({ userId, content, image });
  return result.dataValues;
};

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
        attribute: ["userName", "nickName", "picture"],
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

  console.log(result, "res-------------------");

  return {
    count: result.count,
    blogList,
  };
};

module.exports = {
  createBlog,
  getBlogList,
};
