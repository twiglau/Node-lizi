# nginx 介绍
- 静态文件服务器
- 负载均衡
- 反向代理
# 代理配置
```
// 配置文件目录 MAC
/usr/local/etc/nginx/nginx.conf


// 查验配置格式是否有问题
nginx -t

// 启动配置
nginx

// 如果改动配置,需要重启
nginx -s reload

// 反向代理 配置
server {
    listen 80; #监听端口号
    location / { #如果访问到根目录,pass过
        proxy_pass http://localhost:3000;
    }
}

```
# 访问日志 access log
> 记录用户访问的每一条信息
```
// 配置文件中, 找到 http
http {
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_byte_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /Users/wfp/Learn/koa2-weibo-code/logs/access.log main;
}
```