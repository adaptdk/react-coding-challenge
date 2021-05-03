const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
var path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    open: true,
  },
});
