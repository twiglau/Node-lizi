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

module.exports = {
    createAtRelation
}