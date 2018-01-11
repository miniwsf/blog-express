require("html-loader");
require("vue-loader");
require("css-loader");
const webpack = require("webpack");
const path = require("path");

const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const compiler = require("vue-template-compiler")
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let isProduction = process.env.NODE_ENV === "production";
let HtmlWebpackPlugin = require("html-webpack-plugin");
let chunks=["login"]
/* Shared Dev & Production */
const config = {
    context: path.resolve(__dirname, "src"),

    entry: {
        demo: "./js/demo/demo.js",
        login: "./js/login/login.js",
        blog: "./js/home/blog.js",
        blogDetail: "./js/home/blogDetail.js",
        demos: "./js/home/demos.js",
        home: "./js/home/home.js",
        article: "./js/article/article.js",
        articleAdd: "./js/article/articleAdd.js",
        articleType: "./js/articleType/articleType.js",
        user: "./js/user/user.js",
        file: "./js/file/file.js"
    },

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
        path: path.resolve(__dirname, "dist/public/js/"),
        //filename: "[name].js",
        filename: isProduction ?"[name]/[name].[hash:8].js":"[name]/[name].js",
        publicPath: "/",
    },

    resolve: {
        extensions: [".js"],
        modules: [path.resolve(__dirname, "src"), "node_modules"],
    },

    plugins: [
        // Use "vendor" bundle as global commons chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: isProduction ? "[name]/vendor.[hash:8].js":"[name]/vendor.js",
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                pure_funcs: ["console.log"]
            },
            sourceMap: false
        }),
        new webpack.ProvidePlugin({
            $: path.join(__dirname, "public/js/jquery.min.js"),
            Vue: path.join(__dirname, "public/js/vue.min.js")
        })
    ],

    devServer: {
        historyApiFallback: true,
    },
};

module.exports = config;