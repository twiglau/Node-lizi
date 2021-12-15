/**
 * @description 数据模型入口文件
 * @author lau
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

Blog.belongsTo(User,{
    foreignKey: 'userId'
})

UserRelation.belongsTo(User,{
    foreignKey: 'followerId'
})
User.hasMany(UserRelation,{
    foreignKey:'userId'
})
// 现在向建立以下关系, 数据库显示并没有显示建立
// 理由 Blog 已经通过 userId 与 User 表建立关系
// 但是,并不影响 Blog 表 与 UserRelation 表的连表查询
Blog.belongsTo(UserRelation,{
    foreignKey: 'userId',
    targetKey: 'followerId'
})
Blog.hasMany(AtRelation, {
    foreignKey:'blogId'
})

module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}