/**
 * @description 首页 controller
 * @author lau
 */

const xss = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog ,getFollowersBlogList} = require('../services/blog')
const { PAGE_SIZE,REG_FOR_AT_WHO } = require('../config/constant')
const { getFollowersByUser } = require('../services/user-relation')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')
/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image}
 */
async function create({ userId,content,image }) {
    // service
    // 分析并手机 content 中的 @ 用户
    // content 格式如 'hi @李四 - lisi 你好 @王五 - wangwu '
    const atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr,nickName,userName) => {
            // 目的不是 replace , 而是获取 userName
            atUserNameList.push(userName)
            return matchStr // 替换不生效
        }
    )
    // 根据 @ 用户名查询用户信息
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )
    // 根据用户信息, 获取用户 id
    const atUserIdList = atUserList.map(user => user.id)
    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content:xss(content),
            image
        })
        // 创建 @ 关系
        await Promise.all(atUserIdList.map(userId => createAtRelation(blog.id,userId)))

        // 返回
        return new SuccessModel(blog)
        
    } catch (error) {
        console.error(ex.message,ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }

}

/**
 * 获取首页微博数据
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList(userId,pageIndex = 0){
    const result = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize:PAGE_SIZE
        }
    )
    const { count,blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty:blogList.length === 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count
    })


}
module.exports = {
    create,
    getHomeBlogList
}