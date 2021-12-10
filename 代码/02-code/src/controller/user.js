/**
 * @description user controller
 * @author lau
 */

const { getUserInfo,createUser } = require('../services/user')
const { ErrorModel,SuccessModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')
/**
 * 用户名是否存在
 * @param {*} userName 用户名
 */
async function isExist(userName) {
    // 业务逻辑处理 -同意返回格式
    // 调用 services  获取数据
    // 统一返回格式
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        // 已存在
        return new SuccessModel(userInfo)
    }else {
        // 不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册
 * @param {*} userName
 * @param {*} password
 * @param {*} gender 性别 (1,男,2 女, 3 保密)
 */
async function register({ userName,password,gender }) {
    const userInfo = await getUserInfo(userName)
    if(userInfo){
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    // 注册 service
    try {
        await createUser({
            userName,
            password:doCrypto(password),
            gender
        })
        return new SuccessModel()
        
    } catch (error) {
        console.error(error.message,error.stack)
        return new ErrorModel(registerFailInfo)
    }
}
module.exports = {
    isExist,
    register
}