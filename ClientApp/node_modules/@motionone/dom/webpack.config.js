const path = require("path")

module.exports = {
  mode: "production",
  entry: {
    "size-webpack-animate": path.join(__dirname, "./lib/animate/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: { extensions: [".wasm", ".mjs", ".js", ".jsx", ".json"] },
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
}
