/**
 * @description 广场页  controller
 * @author lau
 */

const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * 获取广场的微博列表
 * @param {number} pageIndex 
 */
async function getSquareBlogList(pageIndex = 0) {
    // 1. 访问Cache 层
    const result = await getSquareCacheList(pageIndex,PAGE_SIZE)
    const blogList = result.getSquareBlogList

    // 拼接返回数据
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count:result.count
    })


}

module.exports = {
    getSquareBlogList
}