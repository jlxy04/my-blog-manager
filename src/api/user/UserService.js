import {ConfigService} from '../ConfigService';
import {BaseService} from '../BaseService';

export class UserService extends BaseService {

 /**
  * 分页查询
  * @param {*} name 用户名
  * @param {*} age 年龄 
  */
  static listUserByPage(params, pageNum, pageSize) {
    let _params = {
      userQuery: 
        params,
      pagination: {
          pageNum,
          pageSize
      }
    };
    return this.postApi(ConfigService.userService.listUserByPage, _params)
  }

  /**
   * 根据ID查询用户
   * @param name
   * @param pid
   */
  static getUserById(name, id) {
    const params = {
      id: id
    };
    return this.postApi(ConfigService.userService.getUserById, params);
  }

  /**
   * 创建用户
   * @param params 用户详情
   * @returns {*}
   */
  static createUser(params) {
    return this.postApi(ConfigService.labelFolderService.moveFolderOrLabelType, params);
  }

  /**
   * 删除文件夹
   * @param folderId
   * @returns {*}
   */
  static deleteUserById(id) {
    const params = {
      id: id
    };
    return this.postApi(ConfigService.labelFolderService.deleteFolder, params);
  }
}
