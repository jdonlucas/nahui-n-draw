const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',  // Elegimos nuestro punto de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },  // Añadimos nuestro punto de salida
  resolve: {
    extensions: ['.js', '.jsx']  // Añadimos el soporte para la extencion de JSX
  },
  module: {
    rules: [
        {
          test: [/\.js$/, /\.jsx$/],
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env','@babel/preset-react']
          }
        },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [  // utilizamos este plugin para añadir el compilado al documento HTML
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};