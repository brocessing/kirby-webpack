#!/usr/bin/env node
'use strict'

const fs = require('fs-extra')
const path = require('path')
const ghdownload = require('github-download')
const sh = require('kool-shell')()
sh.use(require('kool-shell/plugins/log'), {colors: true})
sh.use(require('kool-shell/plugins/spinner'))

const www = path.join(__dirname, '..', 'www')

// @TODO: modules list in either its own config file, or in package.json
const modules = [
  { src: 'https://github.com/getkirby/kirby.git',
    dest: path.join(www, 'kirby')},
  { src: 'https://github.com/getkirby/panel.git',
    dest: path.join(www, 'panel')}
]

const spinner = sh.spinner({ title: 'Updating module : %s' })
spinner.resume()

Promise.all(modules.map((module) => new Promise((resolve, reject) => {
  // @TODO: regex to get repo name from src
  let moduleName = module.src

  spinner.log(`${moduleName} : installing...`)
  fs.pathExists(module.dest)
    .then((exists) => {
      if (exists) {
        fs.removeSync(module.dest)
        spinner.log(`${moduleName} : updating...`)
      }

      ghdownload(module.src, module.dest)
        .on('end', () => {
          module.status = 1
          resolve(moduleName)
        })
        .on('error', err => {
          module.status = 0
          reject(err)
        })
    })
  })
))
.then(() => {
  spinner.pause(true)
  sh.info('🕛  Update complete.')
  modules.forEach(module => {
    if (module.status) sh.success(module.src)
    else sh.error(module.src)
  })
})
.catch(err => sh.error(err))
