# redis
> 1. 内存数据库
> 2. 什么情况下使用内存?
>> 当网站或平台中有些公用数据时
>> 登录时session信息需要存储

# redis 安装
```
brew install redis
```
# 启动 redis-server, redis-cli 连接
```
redis-server
redis-cli

命令端启动后,存入值
set name 'lau'
get name

set site 'twigliu.com'
get site

查询所有值
keys *
```

# nodejs连接redis