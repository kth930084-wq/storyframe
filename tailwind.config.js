/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy aliases (for backward compatibility)
        primary: '#ffffff',
        secondary: '#c8c6c5',
        accent: '#f06600',

        // Material Design 3 - Dark Theme Tokens
        'md-primary': '#ffffff',
        'md-on-primary': '#1a1c1c',
        'md-primary-container': '#d4d4d4',
        'md-on-primary-container': '#000000',

        'md-secondary': '#c8c6c5',
        'md-on-secondary': '#1b1c1c',
        'md-secondary-container': '#474746',
        'md-on-secondary-container': '#e4e2e1',

        'md-tertiary': '#ffdbcb',
        'md-on-tertiary': '#341100',
        'md-tertiary-container': '#f06600',
        'md-on-tertiary-container': '#000000',

        'md-error': '#ffb4ab',
        'md-on-error': '#690005',
        'md-error-container': '#93000a',

        'md-background': '#131313',
        'md-on-background': '#e5e2e1',
        'md-surface': '#131313',
        'md-on-surface': '#e5e2e1',
        'md-on-surface-variant': '#c6c6c6',

        'md-surface-dim': '#131313',
        'md-surface-bright': '#3a3939',
        'md-surface-container-lowest': '#0e0e0e',
        'md-surface-container-low': '#1c1b1b',
        'md-surface-container': '#201f1f',
        'md-surface-container-high': '#2a2a2a',
        'md-surface-container-highest': '#353534',
        'md-surface-variant': '#353534',

        'md-outline': '#919191',
        'md-outline-variant': '#474747',

        'md-inverse-surface': '#e5e2e1',
        'md-inverse-on-surface': '#313030',
        'md-inverse-primary': '#5d5f5f',

        // Light theme tokens (for client share page)
        'md-light-background': '#ffffff',
        'md-light-on-surface': '#1a1c1c',
        'md-light-on-surface-variant': '#3c3b3b',
        'md-light-surface-container': '#f8f8f8',
        'md-light-surface-container-low': '#fafafa',
        'md-light-surface-container-high': '#f0f0f0',
        'md-light-surface-container-highest': '#e2e2e2',
        'md-light-outline-variant': '#c8c6c5',
        'md-light-secondary-container': '#e4e2e1',

        // Semantic colors for feedback
        'success': '#15803d',
        'info': '#1d4ed8',
        'warning': '#ea580c',
      },
      fontFamily: {
        'headline': ['Manrope', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'label': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
