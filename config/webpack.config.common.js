const path = require('path')
const paths = require('./paths.config')

module.exports = {
  output: {
    publicPath: paths.base,
    path: paths.assets,
    filename: '[name].js',
    chunkFilename: '[name].[id].chunk.js'
  },
  resolve: {
    alias: path.aliases
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        include: paths.src
      }
    ]
  },
  plugins: []
}
