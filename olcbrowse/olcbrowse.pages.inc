<?php

function _olcbrowse_page () {
  $path = drupal_get_path('module', 'olcbrowse');
  drupal_add_js($path.'/olcbrowse.js');
  return '<div class="olc-ls-textbook"></div>';
}
