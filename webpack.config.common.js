const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 是否生产环境
isProduction = process.env.NODE_ENV === 'production';
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: {
        main: './src/main.js',
        //指定打包后目录
        'agents/agents': './src/agents/agents.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'CRUISE',
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['main'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            title: 'CRUISE Agents',
            //指定打包后目录
            filename: 'agents/agents.html',
            template: 'src/agents/agents.html',
            chunks: ['agents'],
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: ASSET_PATH
    }
};