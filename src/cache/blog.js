/**
 * @description 微博广场缓存
 * @author 比欧外
 */
const { get, set } = require("./_redis");
const { getBlogList } = require("../services/blog");

// redis key 前缀
const KEY_PREFIX = "weibo:square:";

const getSquareCache = async ({ pageIndex, pageSize }) => {
  const redisKey = `${KEY_PREFIX}:${pageIndex}_${pageSize}`;

  const cacheResult = await get(redisKey);

  if (cacheResult) {
    return cacheResult;
  }

  const result = await getBlogList({ pageIndex, pageSize });
  set(redisKey, result, 60);
  return result;
};

module.exports = {
  getSquareCache,
};
