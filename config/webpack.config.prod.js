const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.common')
const paths = require('./paths.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const prodConfig = {
  entry: {
    'bundle': [path.join(paths.src, 'entry.js'), path.join(paths.src, 'app.scss')]
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: path.resolve(__dirname, 'postcss.config.js') },
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
        })
      }
    ]
  },
  plugins: [
    // Extract all css into one file
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),

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

module.exports = merge(commonConfig, prodConfig)
