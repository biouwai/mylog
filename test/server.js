/**
 * @description jest server
 * @author 比欧外
 */

const request = require("supertest");
const server = require("../src/app").callback();

module.exports = request(server);
