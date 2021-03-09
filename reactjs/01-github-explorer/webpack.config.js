const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html-webpack-plugin

const isDevelopment = process.env.NODE_ENV !== 'production'; // variavel de ambiente dev e produção

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map', //source maps -> eval-source-map
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: { // webpack-dev-server
    contentBase: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({ // html-webpack-plugin
      template: path.resolve(__dirname, 'public', 'index.html'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader', //babel-loader para códigos javascript
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'], //style-loader e css-loader para códigos css
      }
    ],
  }
}
