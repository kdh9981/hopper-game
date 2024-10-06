const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "vm": require.resolve("vm-browserify"),
          "crypto": require.resolve('crypto-browserify'),
          "http": require.resolve('stream-http'),
          "https": require.resolve('https-browserify'),
          "process": require.resolve('process/browser'),
          "buffer": require.resolve('buffer'),
          "stream": require.resolve('stream-browserify'),
          "zlib": require.resolve('browserify-zlib'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
  },
};