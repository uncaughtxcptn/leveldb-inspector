const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: './src/main.js',
    rendered: './src/renderer.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  mode: isProd ? 'production' : 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },

  plugins: [new VueLoaderPlugin()]
};
