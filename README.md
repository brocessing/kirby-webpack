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
- [Project structure](#project-structure)
- [Working with Kirby-webpack](#working-with-kirby-webpack)
  * [Webpack](#webpack)
  * [Kirby](#kirby)
  * [Kirby Package Manager](#kirby-package-manager)
- [List of Kirby-webpack commands](#list-of-kirby-webpack-commands)
- [Want a custom starter kit ?](#want-a-custom-starter-kit-)
  * [`main.config.js`](#mainconfigjs)
  * [`kirby.config.json`](#kirbyconfigjson)
- [Contribute](#contribute)
- [License](#license)

<br><br>

## About

> Kirby is a file-based CMS. Easy to setup. Easy to use. Flexible as hell.

But it lacks the frontend tools ; especially if you're more a front than a back developper.  
Kirby-webpack wraps PHP and [Kirby CMS](http://getkirby.com) inside a full pre-configured [npm](npmjs.com) + [Webpack](https://webpack.github.io/) environnement.

<br><br>

## Features

- No more trouble with git submodules: introducing our own **Kirby Package Manager**
- [Browsersync](https://browsersync.io/) dev server with **livereload** on all your website files
- **Built-in PHP Server** wrapped in the dev server - we handle PHP for you
- [Webpack 3](https://webpack.github.io/) with [HMR](https://webpack.github.io/docs/hot-module-replacement.html) 
- [LESS](http://lesscss.org/) + [PostCSS](http://postcss.org/)  + [Autoprefixer](https://github.com/postcss/autoprefixer) 
- Option to **automatically switch from [LESS](http://lesscss.org/) to [SASS](http://sass-lang.com/) or [Stylus](http://stylus-lang.com/)**
- **`ES6`** transpilation with [babel](https://babeljs.io/) + [babel-preset-env](https://github.com/babel/babel-preset-env)
- Linting with [ESLint](https://eslint.org/) and the [Standard](http://standardjs.com/) presets
- Generate a `stats.json` file from your bundled js to optimize your dependency tree
- **Multiple config files** to make your own workflow from the starterkit

<br><br>

## Requirements
- `node` >= 6
- `npm` >= 3
- `php` >= 5.4
  - macOS → `php` command is native. you don't have to do anything!
  - windows → install it via the official PHP website: [http://windows.php.net/download/](http://windows.php.net/download/)

<br><br>

## Installation

##### Clone the starterkit and install its dependencies
>`npm install` will also trigger the **Kirby Package Manager** : Kirby core, panel and plugins will be automatically installed right after an npm installation.

```sh
$ git clone https://github.com/brocessing/kirby-webpack my-project
$ cd my-project
$ npm install
```

##### :bulb: Before starting your project, it is recommanded to unboil it using [brocessing/`unboil`](https://github.com/brocessing/unboil) :
>`unboil` allows you to clean a boilerplate project (files like package.json, readme, git...) to quickly start your own project from it.

```sh
$ npm i -g unboil # install unboil globally
$ cd my-project
$ unboil          # use it on your brand new kirby-webpack installation
```

<br><br>

## Project structure


```sh
kirby-webpack/
│
├── scripts/
│   # built-in scripts used by Kirby-webpack
│
├── src/           
│   # JS & SASS sources to be bundled by Webpack
│
├── www/               
│   # your usual Kirby website folder
│   # this is all you need to deploy to your server
│   │
│   ├── assets/
│   ├── content/
│   ├── site/
│   └── ...
│
├── kirby.config.json
├── main.config.js
└── package.json
```

<br><br>

## Working with Kirby-webpack

### Webpack
Using Webpack means that you can now have source files and dependencies for all your `JS` and `CSS` assets.

The right way to use Kirby-webpack is to **code all your javascript and LESS (or Sass, or Stylus) files in the `src` folder**. On `npm run build`, Webpack will analyze, compile and bundle all your sources into the main [`www/`](www) Kirby folder.

That means that [`www/`](www) is the only folder you have to deploy to your server.

>Note: you can totally use Kirby as usual by creating your `js` and/or `css` files into [`www/assets/`](www/assets), but you will not benefit from Webpack compilation. You will however still have livereload capability.

<br>

### Kirby
_Kirby-webpack try to be as least intrusive as possible. That said, there is some minor modifications to your ordinary Kirby config you need to be aware of :_

#### CSS livereload 

> Use **`liveCSS()`** instead of the usual `css()` to enable the CSS livereload.

```php
<?php 
  // echo css('assets/bundle.css') 
  echo liveCSS('assets/bundle.css') 
?>
```

#### License file
Kirby's license key registration has been moved into its own [`config/license.php`](www/site/config) file.  
This file is **git ignored**, and required in [`config.php`](www/site/config/config.php). That way you can enter a license key without fear to go public when using Git.

> In a multi-environement setup, require [`license.php`](www/site/config/license.php) in all revelant config files.

```php
@include __DIR__ . DS . 'license.php';
```
<sup>Thanks to [Malvese](https://forum.getkirby.com/t/license-in-config-php-and-deployment/1132) for the idea.</sup>

#### Changes to `config.localhost.php`
> Those two lines are required in [`config.localhost.php`](www/site/config/config.localhost.php) for the dev server to work.

```php
c::set('webpack', !!($_SERVER['HTTP_X_FORWARDED_FOR'] == 'webpack'));
c::set('url', 'http://' . $_SERVER['HTTP_HOST']);
```

#### Bonus: know if Webpack is being used
```php
if (c::get('webpack', false)) {
  echo 'Webpack is enabled.';
}
```

<br>

### Kirby Package Manager
Keeping a Kirby starterkit up-to-date can quickly become tedious, especially if you have a lot of plugins. Working with git submodules may seem like a good idea, but is usually not, as it tends to make your git history harder to keep clean.

Rather than using [Kirby CLI](https://github.com/getkirby/cli/), Kirby-Webpack comes with its own _npm flavored_ **Kirby Package Manager**, allowing for a cleaner way to work both in the NodeJS and in the Git environment.

**Kirby Package Manager** works by keeping a list of all installed Kirby plugins in [`kirby.config.json`](kirby.config.json). Run `npm run kirby:add` to download and register a plugin, and `npm run kirby:remove` to remove and unregister one.  

The registered plugins will be added to [`.gitignore`](.gitignore), and updated each time you'll run `npm install` or `npm run kirby:update`.

> Note: you can also manually edit [`kirby.config.json`](kirby.config.json) as described in "**[Want a custom starter kit ?](#kirbyconfigjson)**".  

<p></p>

> Note: you can still manually download and install plugin the old way, but **Kirby Package Manager** won't be able to track them.

<br><br>

## List of Kirby-webpack commands

### Main
- `npm install`
>Install all npm dependencies, then install all Kirby-webpack dependencies.

- `npm run start`
>Start the PHP dev server with livereload on all your Kirby-webpack files.

- `npm run build`
>Build your `js` and `scss` source files, and bundle them in the [`www/`](www) folder.

### Kirby Package Manager

- `npm run kirby:update`
> Update Kirby core, panel and all the plugins registered in [`kirby.config.json`](kirby.config.json).

- `npm run kirby:ls`
>List all the Kirby modules registered in [`kirby.config.json`](kirby.config.json).

- `npm run kirby:add`
>Run an interactive shell that allows you to add new Kirby plugin to your Kirby-webpack setup.

- `npm run kirby:remove`
>Run an interactive shell that allows you to remove a Kirby plugin from your Kirbby-webpack setup.

### Additional tools
- `npm run stats`
>Generate a `stats.json` of your bundled `js` to analyze your dependency tree.

- `npm run lint`
>Lint your `js` files using [ESLint](https://eslint.org/) and the [Standard](http://standardjs.com/) presets.

<br><br>

## Want a custom starter kit ?

**Fork** this repository and build your own starter kit inside [`www/`](www).  
Edit [`main.config.js`](main.config.js) and [`kirby.config.json`](kirby.config.json) to customize your Kirby-webpack configuration.

<br>

### `main.config.js`
Edit [`main.config.js`](main.config.js) to define your favorite CSS preprocessor, dev server options, and to customize your project folder architecture.  
> Note: Kirby-Webpack will automatically update your npm packages to match the CSS preprocessor you defined in [`main.config.js`](main.config.js).

<br>

### `kirby.config.json`

Edit [`kirby.config.json`](kirby.config.json) to register your favorite Kirby plugins, and Kirby-webpack will automagically install and update them for you.  

Alternatively, use `npm run kirby:add` to add plugins via an interactive shell.

```json
{
  "modules": {
    "core": "https://github.com/getkirby/kirby.git",
    "panel": "https://github.com/getkirby/panel.git",
    "fields": {
      "markdown": "https://github.com/JonasDoebertin/kirby-visual-markdown"
    },
    "plugins": {},
    "tags": {},
    "widgets": {}
  }
}
```
> Note: the left-hand value corresponds to the name of the plugin, not the name of its git repository. For instance, [kirby-visual-markdown](https://github.com/JonasDoebertin/kirby-visual-markdown) is named `markdown`, and needs to be in a folder named `markdown`.

<br><br>

## Contribute

### Issues 
Feel free to submit any issue or request.

### Pull Request
1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we I review your changes

<sup>Be sure to merge the latest from `upstream` before making a pull request.</sup>

<br><br>

## License
[MIT.](https://tldrlegal.com/license/mit-license)
