/**
 * @description 个人主页 test
 * @author lau
 */

 const server = require('../server')
 const { Z_COOKIE } = require('../testUserInfo')
 
 // 加载第一页数据
 test('广场,加载第一页数据', async () => {
     const res = await server
     .get(`/api/square/loadMore/0`)
     .set('cookie',Z_COOKIE)
 
     expect(res.body.errno).toBe(0)
 
     const data = res.body.data
     expect(data).toHaveProperty('blogList')
     expect(data).toHaveProperty('isEmpty')
     expect(data).toHaveProperty('pageSize')
     expect(data).toHaveProperty('pageIndex')
     expect(data).toHaveProperty('count')
 })