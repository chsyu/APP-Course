/** Single source of truth for theme colors (used by tailwind.config + Reanimated). */
const themeColors = {
  light: {
    screen: '#F2F2F7',
    surface: '#FFFFFF',
    content: '#FFFFFF',
    primary: '#E5E5E5',
    text: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    tabUnderline: '#000000',
    headerIcon: '#000000',
    cardPressed: '#D1D5DB',
    chevron: '#C7C7CC',
  },
  dark: {
    screen: '#000000',
    surface: '#1F2937',
    content: '#111827',
    primary: '#1F2937',
    text: '#F3F4F6',
    textSecondary: '#D1D5DB',
    textMuted: '#9CA3AF',
    border: '#374151',
    tabUnderline: '#FFFFFF',
    headerIcon: '#FFFFFF',
    cardPressed: '#374151',
    chevron: '#6B7280',
  },
};

/** [light, dark] pair for color interpolation animations. */
function themeColorPair(key) {
  return [themeColors.light[key], themeColors.dark[key]];
}

module.exports = { themeColors, themeColorPair };
