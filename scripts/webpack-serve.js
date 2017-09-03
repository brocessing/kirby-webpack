const fs = require('fs-extra')
const path = require('path')
const browserSync = require('browser-sync')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.dev.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const phpServerMiddleware = require('php-server-middleware')
const Tail = require('tail').Tail

const user = require('../main.config.js')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))
  .use(require('kool-shell/plugins/exit'))

const LOGPATH = path.join(process.cwd(), 'php-error.log')
const bs = browserSync.create()

let isWebpackInit, isPhpInit
let compiler
let hotMiddleware, devMiddleware, phpMiddleware

phpInit()

function phpInit () {
  sh.log()
  sh.step(1, 3, 'Starting a php server...')

  let args = []
  if (user.devServer.logPhpErrors) {
    args = ['-d', 'error_log="' + LOGPATH + '"']
  }

  phpMiddleware = phpServerMiddleware({
    host: 'localhost',
    root: user.paths.www,
    headers: { 'X-Forwarded-For': 'webpack' },
    verbose: false,
    promptBinary: true,
    phpOpts: { args },
    bin: user.devServer.phpBinary || 'php',
    onStart: () => {
      if (isPhpInit) return
      sh.log('PHP Server started.')
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
    publicPath: user.paths.basepath,
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
    server: { baseDir: user.paths.www },
    middleware: middlewares,
    open: false,
    reloadOnRestart: true,
    notify: false,
    port: user.devServer.port || 8080,
    files: [path.join(user.paths.www, '**/*')],
    watchOptions: {
      ignoreInitial: true,
      ignored: [
        path.join(user.paths.www, '**/*.log'),
        path.join(user.paths.www, 'content', '**/*'),
        path.join(user.paths.www, 'site', 'cache', '**/*'),
        path.join(user.paths.www, 'site', 'accounts', '**/*'),
        path.join(user.paths.www, 'thumbs', '**/*')
      ]
    }
  }, ready)
}

function ready () {
  process.nextTick(() => {
    sh.log()
    sh.success('kirby-webpack server is up and running\n')
    if (user.devServer.logPhpErrors) logPhpError()
  })
}

function logPhpError () {
  fs.ensureFile(LOGPATH)
    .then(() => {
      const tail = new Tail(LOGPATH)
      tail.on('line', (data) => {
        data = data.toString('utf8').split(']')
        const date = sh.colors.gray(data.shift() + ']')
        data = date + data.join(']')
        sh.log(sh.colors.red('[PHP]') + data)
      })
      tail.on('error', err => sh.error(err))
    })
    .catch(err => {
      sh.error(err)
    })
}
