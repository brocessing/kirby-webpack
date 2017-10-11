const path = require('path')

/**
 * BUNDLE ENTRY FILES
 * All file will be passed to your webpack config.
 * Formatted as { input: output }
 * input path are relative to paths.src
 * output path are relative to paths.build
 */
const entries = {
  'index.js': 'assets/bundle.js',
  'index.less': 'assets/bundle.css'
}

/**
 * CSS CONFIGURATION
 */
const css = {
  // Preprocessor used to bundle your CSS
  // This can be 'sass', 'less', 'stylus' or 'manual'.
  // Be sure to have your entries and sourcefiles named with the good file ext
  // —> .scss for sass / .less for less / .styl for stylus
  // Set to 'manual' to handle css yourself (using css-next for instance)
  preprocessor: 'less'
}

/**
 * DEVSERVER CONFIGURATION
 */
const devServer = {
  // Port used by the dev server
  port: 8080,

  // Use this option if you already have a local environment (like MAMP)
  // e.g. proxy: website.dev
  // don't forget to rename config.localhost.php if you use a vhost
  proxy: false,

  // The alias/path to the php binary. OSX has PHP available natively.
  // You have to edit this to have the devServer working on Windows.
  // Use the proxy opt if you can't use / don't want to use a built-in php serv.
  phpBinary: 'php',

  // Set this to true to display PHP logs in your terminal
  // /!\ does nothing if you use the `proxy` option
  logPhpErrors: true
}

/**
 * FOLDER ARCHITECTURE
 * All paths used in kirby-webpack.
 * change them if you want to customize the folder architecture.
 */
const paths = {
  // source folder for js / css
  src: path.join(__dirname, 'src'),

  // folder where webpack bundle files
  build: path.join(__dirname, 'www'),

  // public folder to deploy to your server
  // if you use a proxy, this is often the document root of the server used
  www: path.join(__dirname, 'www'),

  // public baseUrl of your site, generally '/'.
  // it often change depending on your environment,
  // the correct one will be chosen from the value of appEnv.
  basepaths: {
    development: '/',
    preprod: '/',
    production: '/'
  },

  // all kirby paths
  kirby: {
    core: path.join(__dirname, 'www', 'kirby'),
    panel: path.join(__dirname, 'www', 'panel'),
    assets: path.join(__dirname, 'www', 'assets'),
    cache: path.join(__dirname, 'www', 'site', 'cache'),
    fields: path.join(__dirname, 'www', 'site', 'fields'),
    tags: path.join(__dirname, 'www', 'site', 'tags'),
    plugins: path.join(__dirname, 'www', 'site', 'plugins'),
    widgets: path.join(__dirname, 'www', 'site', 'widgets')
  }
}

// the appEnv variable can be used to create environment-specific behaviours
// By default, appEnv can be one of those three values:
//   - development (via npm run start)
//   - preprod (via npm run build:preprod)
//   - production (via npm run build or npm run stats)
const appEnv = process.env.APP_ENV || process.env.NODE_ENV || 'development'

// appEnv is used to choose the correct basepath from paths.basepaths
paths.basepath = paths.basepaths[appEnv] || paths.basepaths.development

module.exports = { paths, entries, css, devServer, appEnv }
