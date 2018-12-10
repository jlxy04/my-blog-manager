'use strict';
// console('==========ENV==========', process.env);
let API_BASE_HOST;

switch (process.env.NODE_ENV) {
  // 正式生产环境
  case 'production':
    API_BASE_HOST = 'https://chief.yifengx.com/label-boss';
    break;
  // 测试环境
  case 'test':
    API_BASE_HOST = 'https://chief-te.yifengx.com/label-boss111';
    break;
  // 开发环境
  case 'development':
    API_BASE_HOST = 'http://127.0.0.1:9090/';
    break;
  default:
    console('当前环境变量不存在!')
}

export {
  API_BASE_HOST,
}
