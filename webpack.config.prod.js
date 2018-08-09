const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const UglifyPlugin = require('uglifyjs-webpack-plugin')

const common = require('./webpack.config.common')
const user = require('./scripts/utils/format-config')(require('./main.config.js'))

const prodConfig = {
  mode: 'production',
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
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Extract all css into one file
    new ExtractTextPlugin({
      filename: (getPath) => {
        const ext = path.extname(getPath('[name]'))
        // If you import css from js entry files, these lines avoid to
        // override the js files with the extract-text-plugin output.
        // Instead, replace the bundle filepath extension by .css
        return (ext === '.css')
          ? getPath('[name]')
          : getPath('[name]').slice(0, -ext.length) + '.css'
      },
      allChunks: true
    }),

    // Minification and size optimization
    new UglifyPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        mangle: true,
        keep_classnames: true,
        keep_fnames: false,
        compress: { inline: false, drop_console: true },
        output: { comments: false }
      }
    }),

    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  devtool: '#source-map'
}

module.exports = merge(common.webpack, prodConfig)
