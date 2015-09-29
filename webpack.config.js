module.exports = {
  devtool: 'source-map',
  output: {
    filename: 'tripleo_ui.js',
    sourceMapFilename: '../js/ripleo_ui.js.map'
  },
  module: {
    loaders: [
      { test: /\.js$/, include: /src/, exclude: /(node_modules|src\/js\/workers)/, loader: 'babel-loader' }//,
      // { test: /disqus-thread.js$/, loader: 'babel-loader' },
      // { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
};
