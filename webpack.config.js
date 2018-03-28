const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm


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
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
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
  ]
};
