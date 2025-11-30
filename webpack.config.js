const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "script.js"),
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "docs"),
    clean: true
  },
  
  devServer: {
    static: "./docs"
  },

  plugins: [
    new HtmlWebpackPlugin(
      {
        template: path.resolve(__dirname, "index.html")
      }
    ),

    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src", "icons"), to: "icons" },
      ],
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }


    ]
  }
}