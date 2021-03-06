// Base settings for both development and production

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export const ROOT_PATH = path.join(__dirname, '..');
export const APP_PATH = `${ ROOT_PATH }/src`;
export const CONFIG = {
  entry: `${ APP_PATH }/main`,
  context: APP_PATH,

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?minimize!sass'),
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.scss'],

    alias: {
      components: `${ APP_PATH }/components`,
      styles: `${ APP_PATH }/assets/styles`,
      pages: `${ APP_PATH }/pages`
    }
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: `${ APP_PATH }/template.html`
    })
  ]
};
