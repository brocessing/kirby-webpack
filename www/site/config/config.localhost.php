<?php

return [
  'debug' => true,
  'cache' => false,

  // The code below is required for the kirby-webpack dev server to work
  'url' => function () {
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] === 'webpack') {
      return $_SERVER['HTTP_X_FORWARDED_PROTO'] . '://' . $_SERVER['HTTP_X_FORWARDED_HOST'];
    }

    return false;
  }
];
