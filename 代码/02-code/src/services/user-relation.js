/**
 * @description 用户关系 services
 * @author lau
 */

const { User,UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 获取关注该用户的用户列表, 即该用户的粉丝
 * @param {number} followerId 被关注人的 ID
 */
async function getUsersByFollower(followerId){
    const result = await User.findAndCountAll({
        attributes: ['id','userName','nickName','picture'],
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })
    // result.count 总数
    // result.rows 查询结果, 数组

    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)

    return {
        count: userList.count,
        userList
    }

}

/**
 * 获取关注人列表
 * @param {*} userId 
 */
async function getFollowersByUser(userId){
    const result = await UserRelation.findAndCountAll({
        order:[
            ['id','desc']
        ],
        include: [
            {
                model:User,
                attributes: ['id','userName','nickName','picture']
            }
        ],
        where:{
            userId
        }
    })

    // result.count
    // result.rows
    let userList = result.rows.map(row => row.dataValues)
    userList = userList.map(item => {
        let user = item.user.dataValues
        user = formatUser(user)
        return user
    })
    return {
        count: result.count,
        userList
    }
}
/**
 * 添加关注关系
 * @param {number} userId 
 * @param {number} followerId 
 */
async function addFollower(userId,followerId) {
    const result = await UserRelation.create({
        userId,
        followerId
    })
    return result.dataValues
}

async function deleteFollower(userId,followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result
}
module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowersByUser
}