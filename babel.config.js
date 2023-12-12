module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@source/*': './src',
          '@components/*': './src/components',
          '@global/*': './src/global',
          '@assets/*': './assets',
          '@helpers/*': './src/helper*',
        },
      },
    ],
  ],
}
