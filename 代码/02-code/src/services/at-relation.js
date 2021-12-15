/**
 * @description 微博 @ 用户关系 service
 * @author lau
 */

const { AtRelation , Blog, User} = require('../db/model/index')
const { formatBlog,formatUser } = require('./_format')
const { PAGE_SIZE } = require('../config/constant')
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

/**
 * 获取 @ 用户的微博列表
 * @param {*} param0 
 */
async function getAtUserBlogList({userId,pageIndex,pageSize = PAGE_SIZE}){
    const result = await Blog.findAndCountAll({
        limit:pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id','desc']
        ],
        include: [
            // @ 关系
            {
                model: AtRelation,
                attributes:['userId','blogId'],
                where: { userId }
            },
            // user
            {
                model: User,
                attributes:['userName','nickName','picture']
            }
        ]
    })

    // 格式化
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count:result.count,
        blogList
    }
    

}
module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList
}