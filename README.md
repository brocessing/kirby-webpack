<h1 align="center">kirby-webpack</h1>
<h3 align="center">Kirby setup with cool front-ends tools</h3>

<div align="center">
  <!-- License -->
  <a href="https://raw.githubusercontent.com/brocessing/kirby-webpack/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
  </a>
</div>

<br><br>
<br><br>
<br><br>

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

### Development
```sh
$ npm run start
$ npm run lint
$ npm run lint:js
```

### Preproduction
```sh
$ npm run build:preprod
$ npm run stats
```

### Production
```sh
$ npm run build
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
