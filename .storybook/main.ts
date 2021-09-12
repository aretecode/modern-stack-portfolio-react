import type { StorybookConfig } from '@storybook/react/types'

module.exports = {
  stories: ['../src/**/*.stories.*', '../stories/**/*.story.tsx'],
  logLevel: 'debug',
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-graphql',
    '@storybook/addon-storyshots',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgenTypescriptOptions: {
      propFilter: prop => ['label', 'disabled'].includes(prop.name),
    },
  },
} as StorybookConfig
