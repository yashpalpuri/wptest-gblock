<?php 
/**
 * Helpers
 */

if( ! function_exists( 'wptest_gblock_client_logos_callback' ) ) {
  /**
   * BLOCK: Client Logos callback
   */
  function wptest_gblock_client_logos_callback( $atts, $content ) {
    $a = shortcode_atts( [
      'logos' => [],
      'columns' => 4,
      'className' => '',
    ], $atts );

    // Return
    if( count( $a[ 'logos' ] ) == 0 ) return;

    ob_start();
    ?>
    <div class="<?= implode( ' ', [ 'myblock--client-logos', $a[ 'className' ] ] ) ?>">
      <div class="client-logos-container">
        <div class="client-logos-grid" style="--grid-col: <?= $a[ 'columns' ] ?>;">
          <?= implode( '', array_map( function( $logo ) {
            return '<div class="item"><img src="'. $logo[ 'url' ] .'" alt="'. $logo[ 'alt' ] .'"></div>';
          }, $a[ 'logos' ] ) ) ?>
        </div>
      </div>
    </div>
    <?php
    return ob_get_clean();
  }
}