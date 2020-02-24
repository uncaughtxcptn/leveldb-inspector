const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';

const commonRules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['@babel/preset-env']
    }
  }
];

const mainProcessConfig = {
  entry: './src/main-process.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main-process.js'
  },
  target: 'node',
  externals: nodeExternals(),
  node: {
    __dirname: false
  },
  mode,
  module: {
    rules: commonRules
  }
};

const rendererProcessConfig = {
  entry: './src/renderer-process.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer-process.js',
    publicPath: './'
  },
  mode,
  module: {
    rules: [
      ...commonRules,
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
  plugins: [
    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: './src/template.html'
    })
  ]
};

module.exports = [mainProcessConfig, rendererProcessConfig];
