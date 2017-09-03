const user = require('./scripts/utils/format-config')(require('./main.config.js'))

const CSSLoaders = [
  {
    loader: 'css-loader',
    options: {
      url: false,
      sourceMap: true,
      minimize: !!(user.appEnv === 'production')
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }
]

if (user.css.preprocessorLoader) {
  CSSLoaders.push(
    {
      loader: user.css.preprocessorLoader,
      options: {
        sourceMap: true
      }
    }
  )
}

const webpack = {
  output: {
    publicPath: user.paths.basepath,
    path: user.paths.build,
    filename: '[name]',
    chunkFilename: '[name].[id].chunk.js'
  },
  resolve: {
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        include: user.paths.src
      }
    ]
  },
  plugins: []
}

module.exports = { CSSLoaders, webpack, user }
