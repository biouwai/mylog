/**
 * @description 加密工具
 * @author 比欧外
 */

const crypto = require("crypto");
const { CRYPTO_SECRET_KEY } = require("../conf/secret");

/**
 * md5加密
 * @param {string} content 明文
 */
const _md5 = (content) => {
  const md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
};

const doCrypto = (content) => {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`;
  return _md5(str);
};

module.exports = {
  doCrypto,
};
