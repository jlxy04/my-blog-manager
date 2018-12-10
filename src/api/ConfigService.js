'use strict';
import { API_BASE_HOST} from '../config/config';

const ConfigService = {
  // 文件夹服务
  userService: {
    // 分页查询
    listUserByPage : `${API_BASE_HOST}/openx/boss/userService/listUserByPage`, 
    // 根据ID查询
    getUserById : `${API_BASE_HOST}/openx/boss/userService/getUserById`,
    // 创建用户
    createUser : `${API_BASE_HOST}/openx/boss/userService/createUser`,
    // 更新用户
    updateUser : `${API_BASE_HOST}/openx/boss/userService/updateUser`,
    // 根据ID删除
    deleteUserById : `${API_BASE_HOST}/openx/boss/userService/deleteUserById`,
  }
};

export {
  ConfigService
};
