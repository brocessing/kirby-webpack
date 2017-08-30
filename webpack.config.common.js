const path = require('path')
const appEnv = process.env.APP_ENV || process.env.NODE_ENV || 'development'

const basePaths = {
  development: '/',
  ghpages: '/',
  preprod: '/',
  production: '/'
}

const paths = {
  src: path.join(__dirname, 'src'),
  public: path.join(__dirname, 'www'),
  assets: path.join(__dirname, 'www', 'assets'),
  build: path.join(__dirname, 'www'),
  base: basePaths[appEnv] || basePaths.development
}

const CSSLoaders = [
  {
    loader: 'css-loader',
    options: {
      url: false,
      sourceMap: true,
      minimize: !!(appEnv === 'production')
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }
]

const webpack = {
  output: {
    publicPath: paths.base + 'assets',
    path: paths.assets,
    filename: '[name].js',
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
        include: paths.src
      }
    ]
  },
  plugins: []
}

module.exports = { paths, CSSLoaders, webpack }
