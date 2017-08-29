/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path')

const paths = {
  src: path.resolve(__dirname, '../src'),
  public: path.resolve(__dirname, '../www'),
  assets: path.resolve(__dirname, '../www/assets'),
  build: path.resolve(__dirname, '../www'),
  base: '/'
}

paths.aliases = {}

module.exports = paths
