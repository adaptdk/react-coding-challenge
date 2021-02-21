const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const isProduction = env === "production";
  const CSSExtract = new MiniCssExtractPlugin({ filename: "styles.css" });

  return {
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"],
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      CSSExtract,
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: "React Assignment",
        favicon: "src/html/img/favicon.png",
        template: "src/html/index.html",
        filename: "index.html",
        minify: false,
        meta: {
          viewport: "width=device-width, initial-scale=1",
          // Android compatible
          "theme-color": "#000",
          "mobile-web-app-capable": "yes",
          "application-name": "React Assignment",
          // IOS compatible
          "apple-mobile-web-app-capable": "yes",
          "apple-mobile-web-app-title": "React Assignment",
        },
      }),
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src/"),
        comp: path.resolve(__dirname, "src/components"),
        hooks: path.resolve(__dirname, "src/hooks"),
        img: path.resolve(__dirname, "src/img"),
        router: path.resolve(__dirname, "src/router"),
        state: path.resolve(__dirname, "src/state"),
        consts: path.resolve(__dirname, "src/state/constants"),
        styles: path.resolve(__dirname, "src/styles"),
        tests: path.resolve(__dirname, "src/tests"),
      },
      extensions: ["*", ".js", ".jsx", ".json"],
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      /* historyApiFallback tells the dev-server that the routing
    is handled via client-side code and that it should return index.html for
    all 404 routes. */
      historyApiFallback: true,
    },
  };
};
