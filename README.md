# blog-express

#### 关于技术
1. 框架：Express
2. 数据库：Mongodb分布式数据库
3. 模板引擎：handlebars
4. ES6
5. 构建打包工具：gulp+webpack

#### 目录结构
```
│-── controller                           // 公共代码库
│ │ ├── common                       // 公共vue组件、vue指令、css
│ │ ├── mock                         // 测试json数据
│ │ ├── module                       // 模板
│ ├── app                              // 与业务相关目录
│ │  ├── common                         // 指定code及其模板类型
│ │ │── controller                     // 资源目录
│ │ │── mock                           // 与业务相关的vue组件
│ │ │── public                         // 编译后的css和js文件
│ │ │── service                        // 数据库操作
│ │ │── view                           // 编译后的html文件
│ │ │── rooter.js                      // 路由配置文件
│ ├── client                           // 公共代码库
│ │ ├── common                       // 公共vue组件、vue指令、css
│ │ ├── mock                         // 测试json数据
│ │ ├── module                       // 模板
├── gulpfile.config.js
├── app.js
├── pagkage.json
├── README.md
├── run.sh                                 // 权限控制
......
```