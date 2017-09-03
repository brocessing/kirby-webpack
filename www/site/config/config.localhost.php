<?php
  c::set('debug', true);
  c::set('cache', false);

  // This option are required for the dev server to work
  c::set('url', 'http://' . $_SERVER['HTTP_HOST']);
