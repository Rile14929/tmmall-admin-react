const path = require('path');
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/app.js'
  },
  resolve:{
    alias:{
      page:path.resolve(__dirname, 'src/page'),
      component:path.resolve(__dirname, 'src/component'),
      util:path.resolve(__dirname,'src/util'),
      service:path.resolve(__dirname,'src/service')
    }
  },
  module:{
    rules: [
      // react文件的处理
        {
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env','react']
            }
          }
        },
        // css
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
        },
        // sass文件的处理
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
        },
        // 图片处理配置
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name:'resource/[name].[ext]'
              }
            }]
        },
        // 字体图标配置
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name:'resource/[name].[ext]'
              }
            }]
        }
      ]
  },
  plugins:[
    // 处理html
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      favicon:'./favicon.ico'
    }),
    // 独立css文件
    new ExtractTextPlugin("css/styles.css"),
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    })
],
// 默认端口
    devServer: {
      port:8086,
      historyApiFallback:{
        index:'/dist/index.html'
      },
      proxy:{
        '/manage': {
          target: 'http://admintest.happymmall.com',
          changeOrigin: true
      },
        '/user/logout.do':{
          target: 'http://admintest.happymmall.com',
          changeOrigin: true
        }
    }
    }
};