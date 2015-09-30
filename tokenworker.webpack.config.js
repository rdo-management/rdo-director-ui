module.exports = {
  devtool: 'source-map',
  output: {
    filename: 'tripleo_ui_token_worker.js',
    sourceMapFilename: 'tripleo_ui_token_worker.js.map'
  },
  module: {
    loaders: [
      { test: /\.js$/, include: /src\/js\/workers/, loader: 'babel-loader' }//,
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
