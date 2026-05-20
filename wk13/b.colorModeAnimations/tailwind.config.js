// tailwind.config.js
const plugin = require("tailwindcss/plugin");
const { themeColors } = require("./theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./theme/**/*.{js,jsx,ts,tsx}",
    "./button.jsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#444B6F",
          "stroke-bg": "#303858",
          stroke: "#A6E1FA",
        },
        theme: {
          background: "var(--theme-background)",
          circle: "var(--theme-circle)",
          icon: "var(--theme-icon)",
          text: "var(--theme-text)",
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--theme-background": themeColors.light.background,
          "--theme-circle": themeColors.light.circle,
          "--theme-icon": themeColors.light.icon,
          "--theme-text": themeColors.light.text,
        },
        ".dark": {
          "--theme-background": themeColors.dark.background,
          "--theme-circle": themeColors.dark.circle,
          "--theme-icon": themeColors.dark.icon,
          "--theme-text": themeColors.dark.text,
        },
      });
    }),
  ],
};
