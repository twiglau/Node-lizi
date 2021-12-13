/**
 * @description: 微博缓存层
 * @author: lau
 */

const { get, set } = require('./_redis')

const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square'

/**
 * 获取广场列表的缓存
 * @param {*} pageIndex
 * @param {*} pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  // 尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult != null) {
    return cacheResult
  } else {
    // 没有缓存则读取数据库
    const result = await getBlogListByUser({ pageIndex, pageSize })
    // 设置缓存 过期时间1分钟
    set(key, result, 60)
    // 返回数据
    return result
  }
}

module.exports = {
  getSquareCacheList
}
