/**
 * @description 存储配置
 * @author 比欧外
 */

const { isProd } = require("../utils/env");

let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};

let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "yxw12345",
  port: "3306",
  database: "tieba",
};

if (isProd) {
  // 线上redis
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };

  // 线上的mysql配置
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "yxw12345",
    port: "3306",
    database: "tieba",
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
