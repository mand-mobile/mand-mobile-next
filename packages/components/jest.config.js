// const TEST_BUNDLE = TEST_TYPE === 'bundle' ? 'lib/mand-mobile.umd' : ''
module.exports = {
  setupFiles: ['jest-canvas-mock', '<rootDir>/test/jest.init.js'],
  moduleFileExtensions: ['web.js', 'web.json', 'web.vue', 'js', 'json', 'vue'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest',
    '.*\\.vue$': 'vue-jest',
    '^.+\\.svg$': 'jest-svg-sprite-loader',
  },
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    '<rootDir>/node_modules/(?!@mand-mobile/)',
  ],
  globals: {
    'vue-jest': {
      babelConfig: {
        configFile: '<rootDir>/.babelrc',
      },
    },
  },
  modulePaths: ['<rootDir>/components', '<rootDir>/node_modules'],
  moduleNameMapper: {
    // '@mand-mobile/platform/lib(.*)': '@mand-mobile/platform/lib/web/$1',
    // 'mand-mobile/src(.*)': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverage: true,
  collectCoverageFrom: ['components/*/*.{js,vue}'],
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './test/coverage',
}
