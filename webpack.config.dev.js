const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.config.common')
const user = require('./scripts/utils/format-config')(require('./main.config.js'))

const devConfig = {
  entry: user.entries,
  module: {
    rules: [
      {
        test: user.css.sourceRegexExt,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          }
        ].concat(common.CSSLoaders)
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: '#eval-source-map'
}

module.exports = merge(common.webpack, devConfig)
