/** Single source of truth for theme colors (used by tailwind.config + Reanimated). */
const themeColors = {
  light: {
    background: "#F8F8F8",
    circle: "#FFFFFF",
    icon: "#F4F4F5",
    text: "#1E1E1E",
  },
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    icon: "#000000",
    text: "#F8F8F8",
  },
};

function themeColorPair(key) {
  return [themeColors.light[key], themeColors.dark[key]];
}

module.exports = { themeColors, themeColorPair };
