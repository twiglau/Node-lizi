/**
 * @description 微博 @ 用户关系 service
 * @author lau
 */

const { AtRelation } = require('../db/model/index')

/**
 * 创建微博 @ 用户的关系
 * @param {*} blogId 
 * @param {*} userId 
 */
async function createAtRelation(blogId,userId){
    const result = await AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues

}

/**
 * 获取 @ 用户的微博数量 (未读的)
 * @param {number} userId
 */
async function getAtRelationCount(userId){
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count

}
module.exports = {
    createAtRelation,
    getAtRelationCount
}