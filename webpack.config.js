const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin its work
  entry: './src/js/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js',
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript 
  // minifying and other things, so let's set mode to development
  mode: 'development',
  // devServer: {
  //   static: './dist',
  //   hot: true,
  // },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin('src/asserts/favicon/favicon-32x32.png'),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/transform-runtime'],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /(node_modules)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
