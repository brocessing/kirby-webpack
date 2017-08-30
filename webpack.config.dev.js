const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.config.common')
const paths = common.paths

const devConfig = {
  entry: {
    'bundle': [path.join(paths.src, 'entry.js'), path.join(paths.src, 'app.scss'), 'webpack-hot-middleware/client']
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
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
