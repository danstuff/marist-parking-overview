const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.mode = 'development';

  config.entry = {
      app: './App.js',
      marMap: './assets/images/marMap.png',
      marLogo: './assets/images/marSeal.png',
  };

  config.output = {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'web-build/dist'),
  };

  config.optimization = {
      runtimeChunk: 'single',
  };

  return config;
};
