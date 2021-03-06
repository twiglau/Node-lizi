/**
 * @description user controller
 * @author lau
 */

const { 
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
 } = require('../services/user')
const { ErrorModel,SuccessModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
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

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx,userName,password) {
    // 登录成功 ctx.session.userInfo = xxxx

    // 获取用户信息
    const userInfo = await getUserInfo(userName,password)
    if(!userInfo){
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功
    if(ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {string} userName 
 */
async function deleteCurUser(userName){
     // service
     const result = await deleteUser(userName)
     if(result){
         // 成功
         return new SuccessModel()
     }
     // 失败
     return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改个人信息
 * @param {Object} ctx 
 * @param {string} nickName 
 * @param {string} city 
 * @param {string} picture 
 */
async function changeInfo(ctx, { nickName,city,picture }) {
    const { userName } = ctx.session.userInfo
    if(!nickName) {
        nickName = userName
    } 
    // service
    const result = await updateUser(
        {
            newNickName: nickName,
            newCity: city,
            newPicture: picture

        },
        { userName }
    )
    if(result) {
        // 执行成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        // 返回
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changeInfoFailInfo)

}

/**
 * 修改密码
 * @param {string} userName 
 * @param {string} password 
 * @param {string} newPassword 
 */
async function changePassword(userName,password,newPassword) {
    const result = await updateUser(
        {
            newPassword:doCrypto(newPassword)
        },
        {
            userName,
            password:doCrypto(password)
        }
    )
    if(result){
        // 成功
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {*} ctx 
 * @returns 
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
  }
module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}