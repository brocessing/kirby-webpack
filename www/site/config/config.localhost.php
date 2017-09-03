<?php
  c::set('debug', true);
  c::set('cache', false);

  // Those two options are required for the dev server to work
  c::set('webpack', !!($_SERVER['HTTP_X_FORWARDED_FOR'] == 'webpack'));
  c::set('url', 'http://' . $_SERVER['HTTP_HOST']);
