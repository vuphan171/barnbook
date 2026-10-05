module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // zod v4 ships `export * as ns`, which the RN preset doesn't transform
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
