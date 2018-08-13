//
//
//
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLBeautifyPlugin = require('html-beautify-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HandlebarsWebpackPlugin = require('handlebars-webpack-plugin');
const path = require('path');


module.exports = {

  devtool: 'source-map',

  entry:  {
    'fsa-style': './src/index.js'
  },

  module: {
    rules: [

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // needed for HTML Partials to work
              interpolate: true,
              removeAttributeQuotes: false
            }
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
            query: {
              partialDirs: [
                  path.join(__dirname, '/src/includes/')
              ]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '/img/',
              name: '[name].[ext]',
              limit: 100000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '/fonts/',
              name: '[name].[ext]',
              limit: 100000
            }
          }
        ]
      }
    ]
  },

  plugins:[
    new CopyWebpackPlugin([
      {
        from: './src/js',
        to: './js/'
      },
      {
        from: './src/img',
        to: './img/'
      }
    ]),

    new HTMLWebpackPlugin({
      // the template you want to use
      template: "./src/includes/base.hbs",
      // the output file name
      filename: path.join(__dirname, "./dist/index.html"),
      inject: "body"
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "[name].css"
    }),

    new HTMLBeautifyPlugin({
      config: {
        html: {
          end_with_newline: true,
          indent_size: 2,
          indent_with_tabs: false,
          indent_inner_html: true,
          preserve_newlines: true,
          unformatted: ['p', 'i', 'b', 'span']
        }
      },
      replace: [ ' type="text/javascript"' ]
    })
  ],

  resolve: {
    modules: ['node_modules', 'src'],
    alias: {
      'fsaStyleScss' : path.join(__dirname, 'node_modules/fsa-style/src/stylesheets/fsa-style.scss')
    }
  }
};
