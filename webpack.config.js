const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputDirectory = "dist";

module.exports = {
    entry: [
        "./src/client/index.js",
        "./src/client/style.css",
        "./src/asset/css/ready.css",
        "./src/asset/css/bootstrap.min.css",
        "./src/asset/css/demo.css"
        ],
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true // true outputs JSX tags
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    require.resolve( 'style-loader' ),
                    require.resolve( 'css-loader' ),
                    require.resolve( 'sass-loader' )
                ]
            },
        ]
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./src/asset/img/favicon.png"
        })
    ],
    node:{
        fs: 'empty',
        net: 'empty'
    }
};