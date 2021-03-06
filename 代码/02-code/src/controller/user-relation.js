/**
 * @description 用户关系 controller
 * @author lau
 */
const { addFollowerFailInfo,deleteFollowerFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
    getUsersByFollower ,
    addFollower,
    deleteFollower,
    getFollowersByUser
} = require('../services/user-relation')
/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 
 */
async function getFans(userId){
    // service
    const { count, userList} =  await getUsersByFollower(userId)

    // 返回
    return new SuccessModel({
        count,
        fansList: userList
    })

}

/**
 * 获取关注人列表
 * @param {*} userId 
 */
async function getFollowers(userId){
    // 直接操作services
    const { count, userList } = await getFollowersByUser(userId)

    return new SuccessModel({
        count,
        followersList: userList
    })

}
/**
 * 关注
 * @param {number} myUserId 
 * @param {number} curUserId 
 */
async function follow(myUserId,curUserId){
    try {
        await addFollower(myUserId,curUserId)
        return new SuccessModel()
        
    } catch (error) {
        console.error({error})
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 取消关注
 * @param {*} myUserId 
 * @param {*} curUserId 
 * @returns 
 */
async function unFollow(myUserId,curUserId){
    const result = await deleteFollower(myUserId,curUserId)
    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}


module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}