const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        host: '127.0.0.1',
        port: '8080'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,    // 小于10000kb自动转base64
                            name: '[name].[ext]?[hash]',
                            outputPath: 'assets/fonts/'
                        }
                    }
                    ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,    // 小于10000kb自动转base64
                            name: '[name].[ext]?[hash]',
                            outputPath: 'assets/images/'
                        }
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new copyWebpackPlugin([{
            from:__dirname+'/src/assets',//打包的静态资源目录地址
            to:'./assets' //打包到dist下面的public
        }]),
    ]
});