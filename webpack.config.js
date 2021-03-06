/*
|--------------------------------------------------------------------------
| webpack.config.js -- Configuration for Webpack
|--------------------------------------------------------------------------
|
| Webpack turns all the clientside HTML, CSS, Javascript into one bundle.js file.
| This is done for performance reasons, as well as for compatability reasons.
|
| You do not have to worry about this file, except for proxy section below.
| All proxies does is route traffic from the hotloader to the backend.
| You must define explicity all routes here, as we do for the /api/* routes.
|
| The rest of this file tell webpack which types of files to bundle (in the rules).
| In addition, it also uses babel to transpile your javascript into code all browsers can use.
| see https://babeljs.io/docs/en/ if this interests you!
|
*/

const path = require("path");
const entryFile = path.resolve(__dirname, "client", "src", "index.js");
const outputDir = path.resolve(__dirname, "client", "dist");

const webpack = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", entryFile],
  output: {
    path: outputDir,
    publicPath: "/",
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
      {
        test: /\.(md)$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "markdown-loader",
          },
        ],
      },
    ],
  },
  // target: "node",
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    fallback: {
      path: require.resolve("path-browserify"),
      util: require.resolve("util/"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer/"),
      https: require.resolve("https-browserify"),
      vm: require.resolve("vm-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      constants: require.resolve("constants-browserify"),
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert/"),
      fs: false,
      child_process: false,
      worker_threads: false,
      net: false,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/caniuse-lite[\/\\]data[\/\\]regions/, /^$/),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./client/dist",
    hot: true,
    proxy: {
      "/api": "http://localhost:3000",
      "/socket.io/*": {
        target: "http://localhost:3000",
        ws: true,
      },
    },
  },
};
