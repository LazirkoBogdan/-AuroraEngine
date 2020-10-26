const path                   = require("path");
const webpack                = require("webpack");
const CopyPlugin             = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin      = require("html-webpack-plugin");
const tinyPngWebpackPlugin   = require("tinypng-webpack-plugin");
const DEBUG                  = false; //process.env.NODE_ENV !== 'production';
const ManifestPlugin         = require("webpack-manifest-plugin");


const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

let game         = process.env.game;
let gameNameAPI  = process.env.apiname;
const url        = process.env.url;
const platformId = process.env.platform_id;
const accountId  = process.env.account_Id;
const gameId     = process.env.game_id;

module.exports = (env) => {
  if (env) {
    if (env.game) {
      game        = env.game;
      gameNameAPI = env.game;
    }
  }

  return {
    mode:         "development", // optimization: {
    //   namedModules: false,
    //   namedChunks: false,
    //   nodeEnv: 'production',
    //   flagIncludedChunks: true,
    //   occurrenceOrder: true,
    //   concatenateModules: true,
    //   splitChunks: {
    // 	  hidePathInfo: false,
    // 	  minSize: 10000,
    // 	  maxAsyncRequests: Infinity,
    // 	  maxInitialRequests: Infinity
    //   },
    //   noEmitOnErrors: true,
    //   checkWasmTypes: true,
    //   minimize: false
    // },
    devtool:      false,
    resolve:      {
      extensions: [".js", ".json"],
    }, entry:     {
      index: [
        `./libs/development/index.js`,
        `./polyfill/index.js`,
        `./core/index.js`,
        `./logic/index.js`,
        `./games/${game}/sources/main.js`,
      ],
    }, output:    {
      filename: "bundle.[hash].js",
      path:     path.resolve(__dirname, "build"),
    },
    plugins:      [
      new webpack.SourceMapDevToolPlugin({}),

      new tinyPngWebpackPlugin({
        key: "key", ext: ["png", "jpeg", "jpg"], proxy: "",
      }),
      new HtmlWebpackPlugin({
        title:      game,
        url:        url,
        gameName:   gameNameAPI,
        platformId: platformId,
        accountId:  accountId,
        gameId:     gameId,
        template:   "./templateIndex.html",
        path:       path.resolve(__dirname, "build"),
        filename:   "index.html", //relative to root of the application
      }), new CopyPlugin([
        {
          from: `art/common`, to: "assets", force: true,
        },
        {
          from: `art/${game}/font`, to: "assets/font", force: true,
        },
		    {
			    from: `art/${game}/atlases`, to: "assets/atlases", force: true,
		    },
        {
          from: `art/${game}/spine`, to: "assets/spine/[path][name].[hash].[ext]", force: true,
        },
      ]),
      new CleanWebpackPlugin(),
      new ManifestPlugin({
        seed: {
          name:             "Always Be Progressive",
          short_name:       "Progressive!",
          display:          "fullscreen",
          background_color: "#102a48",
          icons:            [
            {
              src: "assets/icon-128.png", sizes: "128x128",
            },
          ],
        },
      }),
    ], module:    {
      rules: [
        {
          test: /\.svg$/, loader: "svg-inline-loader",
        },
        {
          test:   /\.json$/,
          loader: "json-loader",
          type:   "javascript/auto",
        },
        {
          test: /\.js$/, exclude: /node_modules/, use: {
            loader: "babel-loader",
          },
        }, {
          test: /\.jpe?g$|\.svg$|\.png$|\.atlas$/, use: {
            loader: "file-loader",
          },
        }, {
          test: /\.(shader|vert|frag|geom)$/i,
          use:  "raw-loader",
        },
      ],
    }, devServer: {
		  useLocalIp: true,
      https:       false,
      compress:    false,
      writeToDisk: true,
		  disableHostCheck:true,
      contentBase: path.join(__dirname, "./dist"),
      host:        "0.0.0.0", //your ip address
      port:        8080,
    },
  };
};
