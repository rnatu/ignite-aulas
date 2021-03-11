const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html-webpack-plugin
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // React refresh webpack plugin
const isDevelopment = process.env.NODE_ENV !== 'production'; // variavel de ambiente dev e produção

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map', //source maps -> eval-source-map
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: { // webpack-dev-server
    contentBase: path.resolve(__dirname, 'public'),
    hot: true, // React refresh webpack plugin
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(), // React refresh webpack plugin

    new HtmlWebpackPlugin({ // html-webpack-plugin
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', //babel-loader para códigos javascript
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel') // React refresh webpack plugin
            ].filter(Boolean)
          }
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'], //style-loader, css-loader e sass-loader para códigos css
      }
    ],
  }
}
