/**
 * @description user model test
 * @author lau
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性,复合预期', () => {
    // build - 不会操作数据库, 会构建一个内存的 User 实例,不会提交到数据库
    const user = User.build({
        userName:'zhangsan',
        password:'p1223322',
        nickName:'张三',
        // gender:'1,
        picture:'/xxx.png',
        city:'洛阳'
    })

    // 验证各个属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('p1223322')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('洛阳')
})