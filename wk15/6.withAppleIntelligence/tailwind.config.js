// tailwind.config.js
const plugin = require('tailwindcss/plugin');
const { themeColors } = require('./theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
    './theme/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        fab: '#777',
        theme: {
          screen: 'var(--theme-screen)',
          surface: 'var(--theme-surface)',
          content: 'var(--theme-content)',
          primary: 'var(--theme-primary)',
          text: 'var(--theme-text)',
          'text-secondary': 'var(--theme-text-secondary)',
          'text-muted': 'var(--theme-text-muted)',
          border: 'var(--theme-border)',
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--theme-screen': themeColors.light.screen,
          '--theme-surface': themeColors.light.surface,
          '--theme-content': themeColors.light.content,
          '--theme-primary': themeColors.light.primary,
          '--theme-text': themeColors.light.text,
          '--theme-text-secondary': themeColors.light.textSecondary,
          '--theme-text-muted': themeColors.light.textMuted,
          '--theme-border': themeColors.light.border,
        },
        '.dark': {
          '--theme-screen': themeColors.dark.screen,
          '--theme-surface': themeColors.dark.surface,
          '--theme-content': themeColors.dark.content,
          '--theme-primary': themeColors.dark.primary,
          '--theme-text': themeColors.dark.text,
          '--theme-text-secondary': themeColors.dark.textSecondary,
          '--theme-text-muted': themeColors.dark.textMuted,
          '--theme-border': themeColors.dark.border,
        },
      });
    }),
  ],
};