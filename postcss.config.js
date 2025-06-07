/**
 * PostCSS configuration file
 * Configures CSS processing plugins for the application
 * Enables Tailwind CSS and autoprefixer
 */

module.exports = {
  plugins: {
    tailwindcss: {},    // Process Tailwind CSS directives
    autoprefixer: {},   // Add vendor prefixes to CSS rules
  },
}
