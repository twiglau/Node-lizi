/**
 * @description 微博 @ 关系 controller
 * @author lau
 */

const {
     getAtRelationCount,
     getAtUserBlogList,
     updateAtRelation
     } = require('../services/at-relation')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE,REG_FOR_AT_WHO } = require('../config/constant')
/**
 * 获取 @ 我的微博数量
 * @param {*} userId 
 */
async function getAtMeCount(userId){
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

/**
 * 获取 @ 用户的微博列表
 * @param {*} userId 
 * @param {*} pageIndex 
 */
async function getAtMeBlogList(userId,pageIndex = 0){
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    const { blogList,count } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

/**
 * 标记为已读
 * @param {*} userId 
 */
async function markAsRead(userId){
    try {
        await updateAtRelation(
            {newIsRead: true },
            {userId,isRead:false}
        )
    } catch (error) {
        console.error(ex)
        
    }

    // 不需要返回 SuccessModel 或者 ErrorModel

}


module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
}