const fs = require('fs-extra')
const path = require('path')
const ghdownload = require('github-download')
const { paths } = require('../webpack.config.common')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'), {colors: true})
  .use(require('kool-shell/plugins/spinner'))

const kirbyTxt = sh.colors.blue('[Kirby Updater] ')

// @TODO: proper arguments handling with minimist
const force = (process.argv[2] === '-f' || process.argv[2] === '--force')

// @TODO: modules list in either its own config file, or in package.json
const modules = [
  {
    src: 'https://github.com/getkirby/kirby.git',
    dest: path.join(paths.public, 'kirby')
  },
  {
    src: 'https://github.com/getkirby/panel.git',
    dest: path.join(paths.public, 'panel')
  }
]

function updateModules () {
  return Promise.all(modules.map((module) => new Promise((resolve, reject) => {
    fs.pathExists(module.dest)
      .then(exists => {
        if (exists) module.status = force ? 'reset' : 'unchanged'
      })
      .then(() => module.status === 'reset' ? fs.remove(module.dest) : null)
      .then(() => {
        if (module.status === 'unchanged') return resolve()
        if (spinnerStatus === 'check') {
          spinnerStatus = 'update'
          spinner.log('Update modules...')
        }
        ghdownload(module.src, module.dest)
          .on('end', () => {
            if (!module.status) module.status = 'created'
            resolve()
          })
          .on('error', err => {
            module.status = 'error'
            reject(err)
          })
      })
      .catch(reject)
  })))
}

const spinner = sh.spinner({ title: kirbyTxt + '%s' })
let spinnerStatus = 'check'

Promise.resolve()
  .then(() => {
    spinner.resume()
    spinner.log('Check for updates...')
  })
  .then(() => updateModules())
  .then(() => {
    spinner.pause(true)
    if (spinnerStatus === 'check') sh.info('🕛  ' + kirbyTxt + 'Nothing to update.')
    else sh.info('🕛  ' + kirbyTxt + 'Update complete.')
  })
  .then(() => modules.forEach(module => {
    switch (module.status) {
      case 'created':
        sh.info(sh.colors.green(' ↪ added ') + module.src)
        break
      case 'reset':
        sh.info(sh.colors.yellow(' ↪ recreated ') + module.src)
        break
      case 'error':
        sh.info(sh.colors.red(' ↪ error ') + module.src)
        break
      case 'unchanged':
        sh.info(sh.colors.gray(' ↪ unchanged ') + module.src)
    }
  }))
  .then(() => sh.log())
  .catch(err => sh.error(err))
