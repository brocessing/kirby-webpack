const startTime = new Date()

const webpack = require('webpack')
const webpackConfig = require('../webpack.config.prod')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))
  .use(require('kool-shell/plugins/exit'))

const compiler = webpack(webpackConfig)

compiler.apply(
  new ProgressBarPlugin({
    format: sh.colors.gray('build [:bar] :percent'),
    clear: true,
    summary: false
  })
)

Promise.resolve()
  .then(() => sh.log('Running the webpack compiler...'))
  .then(
    () =>
      new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
          stats.compilation.modules.forEach((module => {
            if (module.error) return reject(module.error)
          }))
          if (!err) resolve(stats)
          else reject(err)
        })
      })
  )
  .catch(err => {
    webpackError(err)
  })
  .then(() => {
    const elapsedTime = ((new Date() - startTime) / 1000).toFixed(3)
    sh.log()
    sh.success(`Build completed in ${elapsedTime}s !\n`)
    sh.exit(0)
  })

function webpackError (err) {
  sh.error('Error during the webpack compilation')
  sh.error(err)
  sh.exit(0)
}
