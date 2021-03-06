const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const webpack = require("webpack"); // 访问内置的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { resolve } = path;
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development", // production development
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8888,
    open: true,
  },
  entry: resolve(__dirname, "src/index.jsx"),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
  plugins: [
    new webpack.ProgressPlugin(), //显示打包进程
    new CleanWebpackPlugin(), //清理dist文件夹
    new HtmlWebpackPlugin({
      //生成index.html模板
      filename: "index.html",
      template: path.resolve(__dirname, "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        { from: __dirname + "/public", to: __dirname + "/dist/public" },
      ],
    }),
  ],
  resolve: {
    //引入文件的时候可以省略后缀名
    extensions: [".ts", ".js", ".jsx", ".tsx"],
  },
  module: {
    //test 属性，识别出哪些文件会被转换。use 属性，定义出在进行转换时，应该使用哪个 loader。
    rules: [
      {
        test: /\.(js|jsx|tsx)?$/,
        use: ["babel-loader"],
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "public"),
        ],
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        exclude: /node_modules/,
        test: /\.js$/,
        loader: "source-map-loader",
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      }, //less的loader
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }, //scss的loader
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false
            }
          },
        ],
        type: 'javascript/auto'
      },
    ],
  },
};
