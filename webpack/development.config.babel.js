import { CONFIG, ROOT_PATH } from './config';
import webpack from 'webpack';
import merge from './helpers/merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default merge({
  output: {
    path: `${ ROOT_PATH }/.tmp/public`,
    publicPath: '/',
    filename: 'bundle-[hash].js'
  },

  plugins: [
    new ExtractTextPlugin('bundle-[hash].css'),
    new CompressionPlugin({ asset: '{file}.gz', algorithm: 'gzip' })
  ]
}, CONFIG);