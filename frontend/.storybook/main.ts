import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "typescript": {
    "reactDocgen": "react-docgen-typescript",
    "reactDocgenTypescriptOptions": {
      "shouldExtractLiteralValuesFromEnum": true,
      "shouldRemoveUndefinedFromOptional": true,
      "propFilter": (prop) => {
        // Exclude props from node_modules/@untitledui/icons
        if (prop.parent) {
          const isNodeModule = /@untitledui\/icons/.test(prop.parent.fileName);
          return !isNodeModule;
        }
        return true;
      },
      // Skip node_modules except for specific packages
      "skipChildrenOf": ["node_modules"]
    }
  },
  "webpackFinal": async (config: any) => {
    // Suppress "unable to find package.json" warnings from @untitledui/icons
    config.stats = {
      ...config.stats,
      warningsFilter: [/unable to find package\.json for @untitledui\/icons/],
    };
    return config;
  }
};
export default config;
