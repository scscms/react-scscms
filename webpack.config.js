const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    target: "web",
    //devtool: "#cheap-module-eval-source-map",//开发：#cheap-module-eval-source-map 生产：#cheap-module-source-map
    entry: {
        index: './src/pages/index.js',//入口页
    },
    output: {
        filename: './js/[name].js',
        chunkFilename: './js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },{
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
            },{
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ["env", "react"]
                }
            }, {
                test: /\.(jpg|png|ico|jpeg|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "../img/",
                        outputPath: "img/"
                    }
                }]
            }, {
                test: /\.(eot|svg|ttf|woff)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "../font/",
                        outputPath: "font/"
                    }
                }]
            }]
    },
    devServer: {
        contentBase: './dist',
        port: 8088,
        overlay: {error: true},
        proxy: {
            "/api/": {
                target: 'http://www.scscms.com:3001/',
                changeOrigin: true,
                pathRewrite: {}
            }
        },
        hot: true,
        clientLogLevel: "none",
        open: true
    },
    plugins: [
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), //热更新
        new MiniCssExtractPlugin({//提取css公共代码
            filename: './css/[name].css'
        }),
        new HtmlWebpackPlugin({
            title:'OMS首页',//网页标题
            template: 'index.html',//模板文件
            filename:'index.html',//网页文件
            chunks:['vendor','index'],//需要引入的JS模块
            minify:{removeComments:true,collapseWhitespace:true},//是否压缩html
            favicon: 'favicon.ico',
            hash:true,//是否要hash防缓存
        })
    ],
    resolve: {
        extensions: ['.js',".jsx" ,'.json', '.scss'],
        alias: {}
    }
};
