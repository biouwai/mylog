/**
 * @description 广场页
 * @author 比欧外
 */
const { SuccessModel } = require("../model/ResModel");
const { getSquareCache } = require("../cache/blog");
const { PAGE_SIZE } = require("../conf/constant");

/**
 * 查询个人主页博客列表
 * @param {*} param0
 */
const getSquareBlogList = async ({ pageIndex = 0, pageSize = PAGE_SIZE }) => {
  const result = await getSquareCache({ pageIndex, pageSize });
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
  getSquareBlogList,
};
