<?php
/**
 * Plugin Name: Dry Eyes Assessment
 * Description: Interactive assessment tool for evaluating dry eye symptoms
 * Version: 1.0.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) exit;

// Register and enqueue scripts and styles
function dry_eyes_assessment_enqueue_assets() {
    if (!is_admin()) {
        wp_enqueue_style(
            'dry-eyes-assessment',
            plugin_dir_url(__FILE__) . 'dist/index.css',
            array(),
            '1.0.0'
        );

        wp_enqueue_script(
            'dry-eyes-assessment',
            plugin_dir_url(__FILE__) . 'dist/index.js',
            array('react', 'react-dom'),
            '1.0.0',
            true
        );

        // Localize script with WordPress data
        wp_localize_script(
            'dry-eyes-assessment',
            'dryEyesConfig',
            array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('dry-eyes-assessment')
            )
        );
    }
}
add_action('wp_enqueue_scripts', 'dry_eyes_assessment_enqueue_assets');

// Register shortcode
function dry_eyes_assessment_shortcode() {
    ob_start();
    ?>
    <div id="dry-eyes-assessment" class="dry-eyes-assessment-container"></div>
    <?php
    return ob_get_clean();
}
add_shortcode('dry_eyes_assessment', 'dry_eyes_assessment_shortcode');

// Register Gutenberg block
function dry_eyes_assessment_register_block() {
    register_block_type('dry-eyes/assessment', array(
        'editor_script' => 'dry-eyes-assessment',
        'render_callback' => 'dry_eyes_assessment_shortcode'
    ));
}
add_action('init', 'dry_eyes_assessment_register_block');