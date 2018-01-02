const webpack = require("webpack");
const path = require("path");

const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/* Shared Dev & Production */
const config = {
    context: path.resolve(__dirname, "src"),

    entry: {
        index: "./js/login/login.js"
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html"
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
        path: path.resolve(__dirname, "dist/login"),
        filename: "[name].[chunkhash:8].js",
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
        }),
        new webpack.ProvidePlugin({
            $: path.join(__dirname, "public/js/jquery.min.js")
        })
    ],

    devServer: {
        historyApiFallback: true,
    },
};

if (process.env.NODE_ENV === "production") {
    config.output.filename = "[name].[chunkhash:8].js";
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