const webpack = require("webpack");
const path = require("path");

const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const UglifyJsPlugin=require("uglifyjs-webpack-plugin");

/* Shared Dev & Production */
const config = {
    context: path.resolve(__dirname, "routes"),

    entry: {
        index: "./index.js"
    },

    module: {
        rules: [
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
            },
        ],
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
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
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                pure_funcs: ["console.log"]
            },
            sourceMap: false
        })
    ],

    devServer: {
        historyApiFallback: true,
    },
};

if (process.env.NODE_ENV === "production") {
    config.output.filename = "[name].[chunkhash].js";
    config.plugins = [
        ...config.plugins,
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest",
            inlineManifest: true,
        }),
    ];
}

module.exports = config;
