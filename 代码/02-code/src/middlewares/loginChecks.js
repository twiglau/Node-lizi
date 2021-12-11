/**
 * @description 登录验证的中间件
 * @author lau
 */

 const { ErrorModel } = require('../model/ResModel')
 const { jsonSchemaFileInfo, loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API 登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx,next) {
    if(ctx.session && ctx.session.userInfo){
        await next()
        return
    }

    // 未登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx,next) {
    if(ctx.session && ctx.session.userInfo){
        await next()
        return
    }

    // 未登录
    const curUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}