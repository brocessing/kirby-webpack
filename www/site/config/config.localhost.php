<?php
  c::set('debug', true);
  c::set('cache', false);


  // The option below are required for the dev server to work
  // The dev server will rewrite url to work on localhost and local ip.
  c::set('url', 'http://' . $_SERVER['HTTP_HOST']);

  // If you experience issues with assets url, use this one instead:
  // c::set('url', 'http://' . $_SERVER['HTTP_X_FORWARDED_HOST']);
