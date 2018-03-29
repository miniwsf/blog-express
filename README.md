# blog-express

#### 介绍
使用express搭建的个人博客

#### 目录结构
|--controller  控制器文件
|--middlewares  中间件（登录验证）
|--models      数据模型
|--mongodb     mongodb数据库连接
|--public      静态文件
|--routes      路由
|--dist        编译后资源文件
|--src         主要源码
|--|--common   公共组件（eg：弹框等）
|--|--css      与模块相关的css文件
|--|--images   与模块相关的image
|--|--js       与模块相关的js
|--|--views    具体页面

#### 构建工具
主要使用了gulp+webpack自动化构建。
下面是常用的命令:
1. npm start:dev或npm run start:build,发布项目"
2. npm run clean:dev,删除本地编译文件"
3. npm run clean:dist,删除生产环境项目"
4. npm run build,编译正式发布文件"
5. npm run dev,编译本地测试环境文件"

