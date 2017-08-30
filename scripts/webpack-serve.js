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
let isWebpackInit = false

sh.log()
sh.step(1, 2, 'Running the webpack compiler...')
const compiler = webpack(webpackConfig)
const hotMiddleware = webpackHotMiddleware(compiler)
const devMiddleware = webpackDevMiddleware(compiler, {
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
const phpMiddleware = phpServerMiddleware({
  host: 'localhost',
  root: paths.public,
  headers: { 'X-Forwarded-For': 'webpack' },
  verbose: false
})

const middlewares = [devMiddleware, hotMiddleware, phpMiddleware]

function browserSyncInit () {
  sh.log()
  sh.step(2, 2, 'Starting the browser-sync server...')
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
  })
}

compiler.plugin('done', () => {
  // init the browserSync server once a first build is ready
  if (isWebpackInit) return
  isWebpackInit = true
  process.nextTick(browserSyncInit)
})
