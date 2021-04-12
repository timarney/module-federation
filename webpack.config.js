
// based on https://github.com/jherr/unpkg-mf-react-finished/blob/master/react-unpkg-mf-consumer-starter/webpack.config.js

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { camelCase } = require("camel-case");

const federatedRemotes = {
  "@cdssnc/scheduler": "^1",
};
const deps = {
  ...federatedRemotes,
  ...require("./package.json").dependencies,
};

const unpkgRemote = (name) => {
  const pkg = `${camelCase(name)}@https://unpkg.com/${name}@${
    deps[name]
  }/dist/browser/remote-entry.js`;

  console.log(`unpkgRemote ${pkg}`);

  //const pkg = `${camelCase(name)}@http://localhost:3000/dist/browser/remote-entry.js`

  return pkg;
};

const remotes = Object.keys(federatedRemotes).reduce(
  (remotes, lib) => ({
    ...remotes,
    [lib]: unpkgRemote(lib),
  }),
  {}
);

module.exports = {
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  output: {
    path: path.resolve(__dirname, "dist/"),
  },

  devServer: {
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      remotes,
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
