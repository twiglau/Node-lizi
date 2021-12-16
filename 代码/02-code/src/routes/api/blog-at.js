/**
 * @author: lau
 * @description: 微博 @ 关系
 */
 const router = require('koa-router')()
 const { getAtMeBlogList } = require('../../controller/blog-at')
 const { loginCheck } = require('../../middlewares/loginChecks')
 const { getBlogListStr } = require('../../utils/blog')
 
 router.prefix('/api/atMe')
 
 // 加载更多
 router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
   let { pageIndex } = ctx.params
   pageIndex = parseInt(pageIndex)
   const { id: userId } = ctx.session.userInfo
   const result = await getAtMeBlogList(userId, pageIndex)
   result.data.blogListTpl = getBlogListStr(result.data.blogList)
   ctx.body = result
 })
 
 module.exports = router
 