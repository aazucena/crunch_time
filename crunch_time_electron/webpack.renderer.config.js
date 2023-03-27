const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});
rules.push({
  test: /\.s[ac]ss$/i,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader'}],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
      fallback: {
          stream: require.resolve('stream-browserify'),
      },
  },
  externals: {
    serialport: "commonjs2 serialport", // Ref: https://copyprogramming.com/howto/electron-and-serial-ports
    fs:    "commonjs fs",
  },
};
