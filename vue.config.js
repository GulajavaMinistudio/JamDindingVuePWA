// // eslint-disable-next-line no-unused-vars
// const path = require('path');
// // eslint-disable-next-line import/no-extraneous-dependencies
// const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css', 'txt', 'html', 'ico', 'svg'];

// module.exports = {
//   configureWebpack: {
//     resolve: {
//       extensions: ['.js'],
//       alias: {
//         jquery: 'jquery/dist/jquery.slim.min',
//       },
//     },
//     plugins: [
//       new webpack.ProvidePlugin({
//         $: 'jquery',
//         jQuery: 'jquery',
//         jquery: 'jquery',
//         'window.jquery': 'jquery',
//         Popper: ['popper.js', 'default'],
//         Util: 'exports-loader?Util!bootstrap/js/dist/util',
//       }),
//       // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
//     ],
//   },
// };
module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 8192,
        minRatio: 0.8,
      }),
    ],
  },
};
