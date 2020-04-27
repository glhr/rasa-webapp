const webpack = require('webpack');

// URL loader to resolve data-urls at build time
const urlLoader = {
  test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
  loader: 'url-loader?limit=100000'
}

const fileLoader = {
    test: /\.(png|jpg)$/,
    loader: "file-loader?name=[name].[ext]&outputPath=../images/&publicPath=/static/images/",
}

const config = {
    entry:  __dirname + '/js/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          fileLoader,
        ],
    },
    target: 'web'
};
module.exports = config;
