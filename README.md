<h1 align="center">kirby-webpack</h1>
<h3 align="center">Kirby setup with cool front-ends tools</h3>

<div align="center">
  <!-- License -->
  <a href="https://raw.githubusercontent.com/brocessing/kirby-webpack/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
  </a>
</div>

<br><br>

## Table of Content
- [About](#About)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Working with Webpack](#working-with-webpack)
  - [PHP dev server with live reload](#php-dev-server-with-live-reload)
  - [Update](#update)
- [License](#license)

## About

> Kirby is a file-based CMS. Easy to setup. Easy to use. Flexible as hell.

Kirby-webpack makes it _even more_ easier to setup and use, by building around it a full [Webpack](https://webpack.github.io/) environnement, with live-reload, [SASS](http://sass-lang.com/) / [PostCSS](http://postcss.org/) compiler and `ES6` transpilation.

### Easy to setup

Clone, `npm install` and you're good to go. 

#### Want a custom starter kit ? 
[Fork](https://github.com/brocessing/kirby-webpack#fork-destination-box) this repo and build your own starter kit inside Kirby-webpack. Use [`kirby.config.js`]() to define your favorite Kirby plugins, fields and widgets, and Kirby-webpack will automagically install and update them for you.

### Easy to use

Launch the local dev server and start building your project as usual. When you're ready to deploy, use the built-in build commands to bundle your javascript and SASS sources.

## Features

- [Kirby CMS](https://getkirby.com/)
- [Webpack 3](https://webpack.github.io/)
- [SASS](http://sass-lang.com/) + [PostCSS](http://postcss.org/)  + [Autoprefixer](https://github.com/postcss/autoprefixer)
- `ES6` transpilation with [babel](https://babeljs.io/) + [babel-preset-env](https://github.com/babel/babel-preset-env)
- Webpack Dev Server and Hot Reloading
- Easily configurable with multiple config files
- Linting with [ESLint](https://eslint.org/) (and [Standard](http://standardjs.com/) plugin) and [Stylelint](https://stylelint.io/)
- Generate `stats.json` from your bundled js with `stats` command


## Installation
```sh
$ git clone https://github.com/brocessing/kirby-webpack my-project
$ cd my-project
$ npm install
```

Before starting your project, it is recommanded to unboil it using [brocessing/unboil](https://github.com/brocessing/unboil) :

```sh
$ npm i -g unboil
$ cd my-project
$ unboil
```

## Usage

### Working with Webpack

Using a webpack setup means that you now have sources files for all your compiled/bundled built files. These source files are placed in `src/` outside the main `www/` kirby folder, and don't have to be deployed.

When running `npm run build`, `entry.js` and `app.scss` will be compiled and bundled into your kirby `assets/` folder.

<sup>_Note: you can totally use Kirby as usual by creating your `js` and `css` files into `www/assets/`, but you will not benefit from webpack compilation. You will however still have live reload capability._</sup>


### PHP dev server with live reload
```sh
$ npm run start
```

### Update
###### Update Kirby dependencies
```sh
$ npm run kirby:update
```

###### Edit Kirby dependencies
```js
// kirby.config.js

module.exports = {
  modules: {
    core: 'https://github.com/getkirby/kirby.git',
    panel: 'https://github.com/getkirby/panel.git',
    fields: {
      'field1': 'git-clone-url.git',
      'field2': 'git-clone-url.git'
    },
    plugins: {},
    widgets: {}
  }
}

```

## License
[MIT.](https://tldrlegal.com/license/mit-license)
