const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin'); //

// for CleanWebpackPlugin -------------
const pathsToClean = [
  'dist'
];
const cleanOptions = {
  exclude: ['index.html']
};
// ------------------------------------

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"]
      }
      // {
      //   test: /\.html$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]'
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ]
};
