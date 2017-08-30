<h1 align="center">kirby-webpack</h1>
<h3 align="center">Kirby setup with cool front-ends tools</h3>

<div align="center">
  <!-- License -->
  <a href="https://raw.githubusercontent.com/brocessing/kirby-webpack/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
  </a>
</div>

<br><br>

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

- Kirby CMS
- Webpack 3
- SASS + PostCSS + Autoprefixer
- ES6 transpilation with babel + babel-preset-env
- Webpack Dev Server and Hot Reloading
- Easily configurable with multiple config files
- Linting with ESLint (and Standard plugin) and Stylelint
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
MIT.
