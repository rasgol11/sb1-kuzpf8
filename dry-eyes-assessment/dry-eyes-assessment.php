<?php
/**
 * Plugin Name: Dry Eyes Assessment
 * Description: Interactive assessment tool for evaluating dry eye symptoms
 * Version: 1.0.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) exit;

function dry_eyes_assessment_enqueue_scripts() {
    // Generate nonce for security
    $nonce = wp_create_nonce('dry_eyes_assessment_nonce');
    
    // Enqueue React build files
    wp_enqueue_script(
        'dry-eyes-assessment-js',
        plugins_url('build/assets/index.js', __FILE__),
        array(),
        '1.0.0',
        true
    );
    
    wp_enqueue_style(
        'dry-eyes-assessment-css',
        plugins_url('build/assets/index.css', __FILE__),
        array(),
        '1.0.0'
    );
    
    // Pass nonce to JavaScript
    wp_localize_script(
        'dry-eyes-assessment-js',
        'dryEyesAssessment',
        array(
            'nonce' => $nonce,
            'ajaxUrl' => admin_url('admin-ajax.php')
        )
    );
}
add_action('wp_enqueue_scripts', 'dry_eyes_assessment_enqueue_scripts');

function dry_eyes_assessment_shortcode() {
    return '<div id="dry-eyes-assessment" class="dry-eyes-assessment-container"></div>';
}
add_shortcode('dry_eyes_assessment', 'dry_eyes_assessment_shortcode');

// Add cache headers
function dry_eyes_assessment_headers() {
    if (is_page() && has_shortcode(get_post()->post_content, 'dry_eyes_assessment')) {
        header('Cache-Control: private, max-age=3600');
    }
}
add_action('template_redirect', 'dry_eyes_assessment_headers');