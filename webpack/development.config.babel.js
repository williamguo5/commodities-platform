import { CONFIG, APP_PATH } from './config';
import merge from './helpers/merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Export function so we can access it in other modules (see ES6)
export default merge({
  debug: true,
  devtool: 'source-map',

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