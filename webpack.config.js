const path = require('path')
const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackValidator = require('webpack-validator')
const OfflinePlugin = require('offline-plugin')

module.exports = env => {
  env = env || {};
  const specifyProp = (add, value) => add ? value : undefined
  const ifProd = value => specifyProp(env.prod, value)
  const ifDev = value => specifyProp(!env.prod, value)
  const removeEmpty = array => array.filter(i => !!i)
  return webpackValidator({
    entry: env.prod ? {
      app: './js/index.js',
      bootstrap: './sass/main.scss'
    } : {
      app: [
        'webpack-hot-middleware/client?reload=true',
        './js/index.js'
      ],
      bootstrap: [
        'webpack-hot-middleware/client?reload=true',
        './sass/main.scss'
      ]
    },
    output: {
      filename: env.prod ? 'bundle.[name].[chunkhash].js' : '[name].js',
      path: resolve(__dirname, env.prod ? 'dist/assets/' : 'dist'),
      pathinfo: !env.prod
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval-source-map',
    module: {
      loaders: removeEmpty([
        ifDev({test: /\.js$/, loader: 'babel', query: { "presets": ["es2015", "stage-2", "react", "react-hmre"] }, exclude: /node_modules/}),
        ifProd({test: /\.js$/, loader: 'babel', query: { "presets": ["es2015", "stage-2", "react"] }, exclude: /node_modules/}),
        {test: /\.jade$/, loader: 'jade'},
        ifDev({test: /\.css$/,   loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'}),
        ifDev({test: /\.scss$/,  loaders: ["style", "css", "sass?sourceMap"]}),
        ifProd({test: /\.css$/,   loader: ExtractTextPlugin.extract("style-loader", "css-loader")}),
        ifProd({test: /\.scss$/,  loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")}),
        {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
        {test: /\.(png|gif|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
      ]),
    },
    recordsPath: resolve(__dirname, './webpack-records.json'),
    plugins: removeEmpty([
      ifProd(new ExtractTextPlugin('bundle.[name]-[hash].min.css')),
      new HtmlWebpackPlugin({
        filename: env.prod ? '../index.html' : 'index.html',
        favicon: './images/favicon.png',
        template: './index.jade',
        NODE_ENV: env.prod ? 'production' : 'development',
        inject: env.prod ? false : true
      }),
      ifDev(new webpack.optimize.OccurrenceOrderPlugin()),
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifDev(new webpack.NoErrorsPlugin()),
      ifDev(new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})),
      ifProd(new OfflinePlugin()),
    ]),
  })
}
