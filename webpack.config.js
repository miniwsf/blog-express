var webpack = require('webpack');
module.exports = {
     entry:'./entry.js', //入口文件
     output:{
          //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径
          path:__dirname, //输出位置
          filename:'build.js' //输入文件
     },
     module:{
          loaders:[
               {
                   test:/\.css$/,//支持正则
                   loader:'style-loader!css-loader'
               }
          ]
     },
    //其他解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.css', '.scss']
    },
     //插件
     plugins:[
          new webpack.BannerPlugin('This file is created by ly')
     ]
}
