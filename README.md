<p align="center">
  <img src="https://raw.githubusercontent.com/brocessing/kirby-webpack/assets/kirbywebpack-logo.png" width="100" height="auto" alt="logo">
</p>

<h1 align="center">kirby-webpack</h1>
<h3 align="center">A kirby starter-kit with modern frontend tools</h3>

<div align="center">
  <!-- License -->
  <a href="https://raw.githubusercontent.com/brocessing/kirby-webpack/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
  </a>
</div>

<br><br><br><br>

## Table of Content
- [About](#about)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Working with a webpack setup](#working-with-a-webpack-setup)
- [List of kirby-webpack commands](#list-of-kirby-webpack-commands)
- [License](#license)

<br><br>

## About

> Kirby is a file-based CMS. Easy to setup. Easy to use. Flexible as hell.

But it lacks of frontends tools; especially if you're more a front than a back developper. kirby-webpack wraps PHP and kirby inside a full pre-configured [npm](npmjs.com) + [Webpack](https://webpack.github.io/) environnement.

<br><br>

## Features

- No more trouble with git submodules: introducing our own **Kirby Package Manager**
- [Browsersync](https://browsersync.io/) dev server with live reloading on all your websites files
- **Built-in PHP Server** wrapped in the dev server - we handle PHP for you
- [Webpack 3](https://webpack.github.io/) with [HMR](https://webpack.github.io/docs/hot-module-replacement.html) 
- [SASS](http://sass-lang.com/) + [PostCSS](http://postcss.org/)  + [Autoprefixer](https://github.com/postcss/autoprefixer)
- `ES6` transpilation with [babel](https://babeljs.io/) + [babel-preset-env](https://github.com/babel/babel-preset-env)
- Linting with [ESLint](https://eslint.org/) and the [Standard](http://standardjs.com/) presets
- Generate a `stats.json` file from your bundled js to optimize your dependency tree
- Multiple config files to make your own workflow from the starterkit

<br><br>

## Folder structure
```sh
kirby-webpack
↳ scripts # internal scripts used by the starter kit commands
↳ src # Javascript & SASS sources bundled by Webpack
↳ www # The only folder to deploy. Contains all public files (kirby / bundles / assets)
↳ node_modules # nodes module depedencies
```

<br><br>

## Requirements
- node >= 6

- npm >= 3

- php >= 5.4
  - OSX → `php` command is native. you don't have to do anything!
  - Windows → you can install it from windows via the official php website: [http://windows.php.net/download/](http://windows.php.net/download/)

<br><br>

## Installation

##### Clone the starterkit and install its dependencies
> npm install will also trigger the kirby package manager. <br> kirby core, panels, plugins will be automatically installed just after an npm installation.

```sh
$ git clone https://github.com/brocessing/kirby-webpack my-project
$ cd my-project
$ npm install
```

##### :bulb: Before starting your project, it is recommanded to unboil it using [brocessing/unboil](https://github.com/brocessing/unboil) :
> unboil allows you to reset a boilerplate project (files like package.json, readme, git) and quickly make your own project from it.

```sh
$ npm i -g unboil # install unboil globally
$ cd my-project
$ unboil # use it on your brand new kirby-webpack installation
```

<br><br>

## Working with a Webpack setup
Using webpack means that you have sources files and their dependencies that will be compiled to bundle files when doing `npm run build`. The right way to use kirby-webpack is to **code all your javascript and css in the `src` folder**. Webpack will then create bundle directly into the main `www` kirby folder, which contain all your site. That means the `www` is the only folder you have to deploy to your server.

<sup>_Note: you can totally use Kirby as usual by creating your `js` and `css` files into `www/assets/`, but you will not benefit from webpack compilation. You will however still have live reload capability._</sup>

<br><br>

## List of kirby-webpack commands

#### `npm run install`
- TODO

#### `npm run start`
- TODO

#### `npm run build`
- TODO

#### `npm run kirby:update`
- TODO

#### `npm run kirby:add`
- TODO

#### `npm run kirby:remove`
- TODO

#### `npm run stats`
- TODO

#### `npm run lint`
- TODO

<br><br>

## License
[MIT.](https://tldrlegal.com/license/mit-license)
