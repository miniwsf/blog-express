require("html-loader");
require("vue-loader");
require("css-loader");
const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 获取所有入口文件
let getEntry = function(globPath) {
    var entries = {
        vendor: ["../public/js/jquery.min.js","../public/js/bootstrap.min.js","../public/js/vue.min.js"] // 类库
    };
    glob.sync(globPath).forEach(function(entry) {
        let pathname = entry.split("/").splice(3).join("/").split(".")[0];
        let path="./js/"+entry.split("/").splice(3).join("/").split(".")[0];
        entries[pathname] = [path];
    });
    return entries;
};

let entries = getEntry("./src/views/**/*.hbs");
let chunks = Object.keys(entries);

/* 判断是否是生产环境 */
let isProduction = process.env.NODE_ENV.trim() == "production";
let pathFile = isProduction?"dist":"dev";
/*多页面html插件*/
let HtmlWebpackPlugin = require("html-webpack-plugin");
/* Shared Dev & Production */
const config = {
    context: path.resolve(__dirname, "src"),
    entry: entries,
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test:/\.vue$/,
                loader:"vue-loader",
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader",["css-loader","autoprefixer","postcss-loader","sass-loader"])
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|jpeg|gif|png|svg|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: { name: "[name].[hash].[ext]" },
                },
            }
        ],
    },

    output: {
        path: path.resolve(__dirname, pathFile+"/app/"),
        filename: isProduction ?"js/[name].[hash:8].js":"js/[name].js",
        publicPath: "/",
    },

    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [ ".js", ".json", ".scss"],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            handlebars : "public/js/handlebars-v4.0.10.js"
        }
    },

    plugins: [
        // Use "vendor" bundle as global commons chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: isProduction ? "js/[name]/vendor.[hash:8].js":"js/[name]/vendor.js"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin(isProduction ? "css/[name].[hash:8].css":"css/[name].css"),
        new webpack.ProvidePlugin({
            $: path.join(__dirname, "public/js/jquery.min.js"),
            jQuery: path.join(__dirname, "public/js/jquery.min.js"),
            Vue: path.join(__dirname, "public/js/vue.min.js")
        })
    ],

    devServer: {
        historyApiFallback: true,
    },
};

if(isProduction){
    let uglify=new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            pure_funcs: ["console.log"]
        },
        sourceMap: false
    });
    config.plugins.push(uglify);
}
module.exports = config;

// 生成HTML文件
chunks.forEach(function(pathname) {
    if (pathname == "vendor") {
        return;
    }
    var conf = {
        title: "Sunshine wsf",
        filename: isProduction? "src/views/" + pathname + ".hbs" : "src/views/"+pathname + ".hbs",
        template: "../src/views/" + pathname + ".hbs",
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    };
    if (pathname in module.exports.entry) {
        if(pathname=="login/login"){
            conf.inject="body";
            conf.chunks = ["vendor",pathname];
        }
        else if(pathname != "index" && pathname!="layout"){
            conf.inject="body";
            conf.chunks = [pathname];
        }
        else{
            conf.inject="head";
            conf.chunks = ["vendor"];
        }
        conf.hash = false;
    }
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});