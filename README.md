<p align="center">
  <img src="https://raw.githubusercontent.com/brocessing/kirby-webpack/assets/kirbywebpack-logo.png" width="100" height="auto" alt="logo">
</p>

<h1 align="center">kirby-webpack</h1>
<h3 align="center">A Kirby 3 starter-kit with modern frontend tools</h3>

<div align="center">
  <!-- License -->
  <a href="https://raw.githubusercontent.com/brocessing/kirby-webpack/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" /></a>
</div>

<br>

> NOTE : This starter-kit is for **Kirby 3**. For the Kirby 2 version of this starter-kit, [check this branch](https://github.com/brocessing/kirby-webpack/tree/kirby-2).

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
- [Webpack 4](https://webpack.github.io/) with [HMR](https://webpack.github.io/docs/hot-module-replacement.html) 
- [SASS](https://sass-lang.com/) + [PostCSS](http://postcss.org/)  + [Autoprefixer](https://github.com/postcss/autoprefixer) 
- Option to **automatically switch from [SASS](https://sass-lang.com/) to [LESS](http://lesscss.org/) or [Stylus](http://stylus-lang.com/)**
- **`ES6`** transpilation with [babel](https://babeljs.io/) + [babel-preset-env](https://github.com/babel/babel-preset-env)
- Linting with [ESLint](https://eslint.org/) and the [Standard](http://standardjs.com/) presets
- Generate a `stats.json` file from your bundled js to optimize your dependency tree
- **Multiple config files** to make your own workflow from the starterkit

<br><br>

## Requirements
- `node` >= 8
- `npm` >= 5
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
│   # JS & Less/Sass/Stylus sources to be bundled by Webpack
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

The right way to use Kirby-webpack is to **code all your javascript and LESS (or Sass, or Stylus) files in the [`src/`](src) folder**. On `npm run build`, Webpack will analyze, compile and bundle all your sources into the main [`www/`](www) Kirby folder.

That means that [`www/`](www) is the only folder you have to deploy to your server.

>Note: you can totally use Kirby as usual by creating your `js` and/or `css` files into [`www/assets/`](www/assets), but you will not benefit from Webpack compilation nor auto-injection. You will however still have livereload capability.

#### Relative urls in CSS sourcefiles
:warning: If you use relative url in your sass/stylus/less, you had to write them **relative to the output of the bundled css file**, not the source filepath.

###### Example
```css
/**
 * Your less source file is 'src/index.less'
 * It will be bundle to 'www/assets/bundle.css'
 * You want to require 'www/assets/images/logo.png' in your less file.
 */

/* GOOD: logo.png is relative to your bundle.css filepath */
body { background: url('images/logo.png'); }

/* WRONG: logo.png doesn't have to be relative to your website root */
body { background: url('assets/images/logo.png'); }

/* WRONG: logo.png doesn't have to be relative to the source file */
body { background: url('../www/assets/images/logo.png'); }
```

<br>

### Kirby
_Kirby-webpack try to be as least intrusive as possible. That said, there is some minor modifications to your ordinary Kirby config you need to be aware of :_

#### The `kirby-webpack` plugin
There is a special [`kirby-webpack`](www/site/plugins/kirby-webpack) Kirby plugin containing all required helpers to make Kirby-webpack working correctly. Don't remove it!

#### CSS livereload 

> Use **`liveCSS()`** instead of the usual `css()` to enable the CSS hot-reloading.  
Continue to use `css()` for simple vendor CSS files which don't require hot-reloading.

```diff  
<?php
-   echo css('assets/bundle.css')
+   echo liveCSS('assets/bundle.css')
?>
```

#### Changes to `config.localhost.php`
> These lines are required in [`config.localhost.php`](www/site/config/config.localhost.php) for the dev server to work.

> If you configure kirby-webpack to work with a proxy and a vhost, you will have to rename [`config.localhost.php`](www/site/config/config.localhost.php) accordingly to the virtual-host you use.

```php
  if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] === 'webpack') {
    c::set('url', '//' . $_SERVER['HTTP_X_FORWARDED_HOST']);
  }
```

#### Bonus: know if Webpack is being used
```php
if (isWebpack()) {
  echo 'Your are viewing the site through the dev server.';
}
```

<br>

### Kirby Package Manager
Keeping a Kirby starterkit up-to-date can quickly become tedious, especially if you have a lot of plugins. Working with git submodules may seem like a good idea, but is usually not, as it tends to make your git history harder to keep clean.

Rather than using [Kirby CLI](https://github.com/getkirby/cli/), Kirby-webpack comes with its own _npm flavored_ **Kirby Package Manager**, allowing for a cleaner way to work both in the NodeJS and in the Git environment.

**Kirby Package Manager** works by keeping a list of all installed Kirby plugins in [`kirby.config.json`](kirby.config.json). Run `npm run kirby:add` to download and register a plugin, and `npm run kirby:remove` to remove and unregister one.  

The registered plugins will be added to [`.gitignore`](.gitignore), and updated each time you'll run `npm install` or `npm run kirby:update`.

> Note: you can also manually edit [`kirby.config.json`](kirby.config.json) as described in "**[Want a custom starter kit ?](#kirbyconfigjson)**".  

<p></p>

> Note: you can still manually download and install plugins the old way, but **Kirby Package Manager** won't be able to track them.

<br><br>

## List of Kirby-webpack commands

### Main
- `npm install`
>Install all npm dependencies, then install all Kirby-webpack dependencies. Please note that the `postinstall` script automatically installs the Kirby core registered in [`kirby.config.json`](kirby.config.json).

- `npm run start`
>Start the PHP dev server with livereload on all your Kirby-webpack files.

- `npm run build`
>Build your `js` and `scss`/`less`/`styl` source files, and bundle them in the [`www/`](www) folder.

### Kirby Package Manager

- `npm run kirby:update`
> Update Kirby core, panel and all the plugins registered in [`kirby.config.json`](kirby.config.json).

- `npm run kirby:ls`
>List all the Kirby modules registered in [`kirby.config.json`](kirby.config.json).

- `npm run kirby:add`
>Run an interactive shell that allows you to add new Kirby plugin to your Kirby-webpack setup.

- `npm run kirby:remove`
>Run an interactive shell that allows you to remove a Kirby plugin from your Kirby-webpack setup.

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
> Note: Kirby-webpack will automatically update your npm packages to match the CSS preprocessor you defined in [`main.config.js`](main.config.js).

<br>

### `kirby.config.json`

Edit [`kirby.config.json`](kirby.config.json) to register your favorite Kirby plugins, and Kirby-webpack will automagically install and update them for you.  

Alternatively, use `npm run kirby:add` to add plugins via an interactive shell.

```json
{
  "modules": {
    "core": "https://github.com/getkirby/kirby.git",
    "plugins": {
      "kirby-color": "https://github.com/TimOetting/kirby-color.git"
    }
  }
}
```
> Note: the left-hand value corresponds to the name of the plugin, not the name of its git repository.

<br><br>

## Contribute

### Issues 
Feel free to submit any issue or request.

### Pull Request
1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we review your changes

<sup>Be sure to merge the latest from `upstream` before making a pull request.</sup>

<br><br>

## License
[MIT.](https://tldrlegal.com/license/mit-license)
