/**
 * @description 接口模型
 * @author 比欧外
 */

class BasicModel {
  constructor({ errno, data, message }) {
    this.errno = errno;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

/**
 * 成功数据模型
 */
class SuccessModel extends BasicModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data,
    });
  }
}

/**
 * 失败数据模型
 */
class ErrorModel extends BasicModel {
  constructor({ errno, message }) {
    super({ errno, message });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
