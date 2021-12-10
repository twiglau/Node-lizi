/**
 * @description 数据格式化
 * @author lau
 */

const { DEFAULT_PICTURE } = require('../config/constant')
/**
 * 用户默认头像
 * @param {*} obj 用户对象
 * @returns 
 */
function _formatUserPicture(obj){
    if(obj.picture == null){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list){
    if(list == null){
        return list
    }
    if(list instanceof Array){
        // 数组 -用户列表
        return list.map(_formatUserPicture)
    }

    // 单个对象
    let result = list
    result = _formatUserPicture(result)
    return result

}

module.exports = {
    formatUser
}