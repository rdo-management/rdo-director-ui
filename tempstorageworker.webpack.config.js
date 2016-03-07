module.exports = {
  devtool: 'source-map',
  output: {
    filename: 'tripleo_ui_tempstorage_worker.js',
    sourceMapFilename: 'tripleo_ui_tempstorage_worker.js.map'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src\/js\/workers/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
