const { withXcodeProject } = require('@expo/config-plugins');

/**
 * Removes legacy EXCLUDED_ARCHS[sdk=iphonesimulator*]=arm64 which breaks
 * iOS Simulator builds on Apple Silicon (no valid xcodebuild destination).
 */
function withIosSimulatorArchFix(config) {
  return withXcodeProject(config, (config) => {
    const project = config.modResults;
    const configurations = project.pbxXCBuildConfigurationSection();

    for (const key of Object.keys(configurations)) {
      const item = configurations[key];
      if (typeof item !== 'object' || !item.buildSettings) continue;
      delete item.buildSettings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'];
    }

    return config;
  });
}

module.exports = withIosSimulatorArchFix;
