# Kirby LESS Plugin

This plugin adds a less() helper that works similar to the css() helper.

**Compatible with cachebuster**  
**Minified output** by default  
LESS compiler from [https://github.com/leafo/lessphp](https://github.com/leafo/lessphp)

## Installation

Copy the ```less``` folder to ```/site/plugins/```.

## Usage

```php
<?php echo less('path/to/file.less'); ?>
For example:
<?php echo less('assets/less/main.less'); ?>
```

### Options

```php
<?php
// config.php
c::set('less.compress', false); // default set to true
```

### Recommended folder structure

```
assets
│
├── css
│   └ ....css
│
└── less
    │ ....less
    │ ....less
    └ ....less
```

The .css file path is determined by two rules:

```php
Replace '/less/' by '/css/'
Replace '.less'  by '.css'
```

## Author
Thomas Ghysels <info@thomasg.be>
