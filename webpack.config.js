const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext) =>
  isDev ? `bundle.${ext}` : `bundle.[contenthash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ];

  if (isDev) {
    loaders.push({
      loader: "eslint-loader",
    });
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./index.js",
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
  devtool: isDev ? "source-map" : false,
  devServer: {
    watchFiles: path.resolve(__dirname, "src"),
    port: 3000,
    hot: isDev,
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: "Excel App",
      template: "index.html",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),

    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
