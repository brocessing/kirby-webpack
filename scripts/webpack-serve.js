const path = require('path')
const browserSync = require('browser-sync')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.dev.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const phpServerMiddleware = require('php-server-middleware')

const { paths } = require('../webpack.config.common')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))
  .use(require('kool-shell/plugins/exit'))

const bs = browserSync.create()

let isWebpackInit, isPhpInit
let compiler
let hotMiddleware, devMiddleware, phpMiddleware

phpInit()

function phpInit () {
  sh.log()
  sh.step(1, 3, 'Starting a php server...')

  phpMiddleware = phpServerMiddleware({
    host: 'localhost',
    root: paths.public,
    headers: { 'X-Forwarded-For': 'webpack' },
    verbose: false,
    promptBinary: true,
    bin: 'php',
    onStart: () => {
      if (isPhpInit) return
      isPhpInit = true
      webpackInit()
    }
  })
}

function webpackInit () {
  sh.log()
  sh.step(2, 3, 'Running the webpack compiler...')
  compiler = webpack(webpackConfig)
  hotMiddleware = webpackHotMiddleware(compiler)
  devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: paths.base + 'assets',
    stats: {
      colors: true,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })
  compiler.plugin('done', () => {
    // init the browserSync server once a first build is ready
    if (isWebpackInit) return
    isWebpackInit = true
    process.nextTick(browserSyncInit)
  })
}

function browserSyncInit () {
  sh.log()
  sh.step(3, 3, 'Starting the browser-sync server...')

  const middlewares = [devMiddleware, hotMiddleware, phpMiddleware]

  bs.init({
    server: { baseDir: paths.public },
    middleware: middlewares,
    open: false,
    reloadOnRestart: true,
    notify: false,
    port: 8080,
    files: [path.join(paths.public, '**/*')],
    watchOptions: {
      ignoreInitial: true,
      ignored: [
        path.join(paths.public, 'content', '**/*'),
        path.join(paths.public, 'site', 'cache', '**/*'),
        path.join(paths.public, 'site', 'accounts', '**/*'),
        path.join(paths.public, 'thumbs', '**/*')
      ]
    }
  }, ready)
}

function ready () {
  process.nextTick(() => {
    sh.log()
    sh.success('kirby-webpack server is ready !\n')
  })
}
