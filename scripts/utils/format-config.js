const path = require('path')

const PREPROC_LOADER = {
  less: 'less-loader',
  sass: 'sass-loader',
  stylus: 'stylus-loader'
}

const PREPROC_EXT = {
  less: 'less',
  sass: 'scss',
  stylus: 'styl'
}

let cached = null

function formatConfig (config) {
  if (cached) return cached

  // format entries for webpack
  const nEntries = {}
  for (let k in config.entries) {
    const src = path.join(config.paths.src, k)
    const dist = config.entries[k]
    if (!nEntries[dist]) {
      nEntries[dist] = (config.appEnv === 'development')
        ? [src, 'webpack-hot-middleware/client?reload=true']
        : src
    } else if (Array.isArray(nEntries[dist])) {
      nEntries[dist].unshift(src)
    } else if (typeof nEntries[dist] === 'string') {
      nEntries[dist] = [src, nEntries[dist]]
    }
  }

  config.entries = nEntries

  // add preprocessor loader and ext
  config.css.preprocessorLoader = PREPROC_LOADER[config.css.preprocessor] || null
  config.css.sourceExt = PREPROC_EXT[config.css.preprocessor] || 'css'
  config.css.sourceRegexExt = new RegExp('\\.(' + config.css.sourceExt + ')$')

  cached = config
  return cached
}

module.exports = formatConfig
