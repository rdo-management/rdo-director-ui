module.exports = {
  devtool: 'source-map',
  output: {
    filename: 'tripleo_ui.js',
    sourceMapFilename: '../js/ripleo_ui.js.map',
    library: 'tripleo_ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      { test: /\.js$/, include: /src/,
        exclude: /src\/js\/workers/, loader: 'babel-loader' }
      // { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
