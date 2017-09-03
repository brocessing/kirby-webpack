const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('./webpack.config.common')
const user = require('./scripts/utils/format-config')(require('./main.config.js'))

const prodConfig = {
  entry: user.entries,
  module: {
    rules: [
      {
        test: user.css.sourceRegexExt,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: common.CSSLoaders
        })
      }
    ]
  },
  plugins: [
    // Extract all css into one file
    new ExtractTextPlugin({ filename: '[name]', allChunks: true }),

    // Minification and size optimization
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, screw_ie8: true, drop_console: true },
      output: { comments: false },
      mangle: { screw_ie8: true },
      sourceMap: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  devtool: '#source-map',
  bail: true
}

module.exports = merge(common.webpack, prodConfig)
