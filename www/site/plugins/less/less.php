<?php

require_once('less.inc.php');

$compress = c::get('less.compress', true);

$kirby = kirby();

$kirby->options['less.handler'] = function($url, $media = false) use($kirby, $compress) {

  if(is_array($url)) {
    $less = array();
    foreach($url as $u) $less[] = call($kirby->options['less.handler'], $u);
    return implode(PHP_EOL, $less) . PHP_EOL;
  }

  // Update folder and file extension
  $compiledUrl = str_replace('/less/', '/css/', $url);
  $compiledUrl = str_replace('.less', '.css', $compiledUrl);

  $root = $kirby->roots()->index() . DS;

  // Will throw error if $file does not exist
	$less = new lessc;
	$less->setFormatter($compress ? 'compressed' : '');
	$less->checkedCompile($root . $url, $root . $compiledUrl);

  return call(kirby()->option('css.handler'), array($compiledUrl, $media));

};

/**
 * Compile less to css and then call css.handler
 *
 * @param string $url
 * @param string $media
 * @return string
 */
function less() {
  return call(kirby::instance()->option('less.handler'), func_get_args());
}
