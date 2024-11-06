/**
 * @description 个人主页
 * @author 比欧外
 */
const { SuccessModel } = require("../model/ResModel");
const { getBlogList } = require("../services/blog");
const { PAGE_SIZE } = require("../conf/constant");

/**
 * 查询个人主页博客列表
 * @param {*} param0
 */
const getProfileBlogList = async ({
  userName,
  pageIndex = 0,
  pageSize = PAGE_SIZE,
}) => {
  const result = await getBlogList({ userName, pageIndex, pageSize });
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: result.length === 0,
    blogList: result.blogList,
    pageSize,
    pageIndex,
    count: result.count,
  });
};

module.exports = {
  getProfileBlogList,
};
