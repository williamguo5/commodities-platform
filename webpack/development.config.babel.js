import { CONFIG, ROOT_PATH } from './config';
import webpack from 'webpack';
import merge from './helpers/merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default merge({
  debug: true,
  devtool: 'source-map',

  module: {
    loaders: [
      {test: require.resolve('chart.js'), loader: 'imports?this=>window'},
    ]
  },

  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],

  devServer: {
    info: true,
    hot: false,
    inline: true,
    stats: {
      colors: true
    },
    port: 9999,
    historyApiFallback: true
  }
}, CONFIG);