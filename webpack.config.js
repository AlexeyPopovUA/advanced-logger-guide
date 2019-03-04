const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    console.log(env);

    const mode = env.prod ? 'production' : 'development';
    const destinationPath = 'dist';
    const watch = env.watch;

    return {
        entry: {
            index: './src/index.tsx'
        },
        target: "web",
        mode,
        devtool: "sourcemaps",
        watch,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        },
        devServer: {
            contentBase: './dist',
            port: 9000
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, destinationPath)
        },
        resolve: {
            extensions: [".js", ".mjs", ".ts", ".tsx", ".js", ".scss", ".css"]
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ["**/*", "../coverage", "../cache-jest"],
                dangerouslyAllowCleanPatternsOutsideProject: true,
                dry: false
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new HtmlWebpackPlugin({
                inject: false,
                template: './resources/index.html',
                filename: 'index.html',
                PRODUCTION: !!env.release,
                GOOGLE_ANALYTICS_SCRIPT: !!env.release ?
                    "<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-127711409-2\"></script>" : ""
            }),
            new GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                runtimeCaching: [
                    {
                        urlPattern: new RegExp('.+w3schools.+\.css'),
                        handler: 'CacheFirst'
                    },
                    {
                        urlPattern: new RegExp('.+raw\.githubusercontent\.com.+CHANGELOG\.md'),
                        handler: 'CacheFirst'
                    },
                    {
                        urlPattern: new RegExp('.+manifest\.json'),
                        handler: 'CacheFirst'
                    }
                ]
            }),
            new CopyWebpackPlugin([
                {from: './resources/manifest.json', to: "./", flatten: true},
                {from: './images', to: "./"},
            ]),
            //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],
        module: {
            rules: [
                {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: ["./styles"]
                            }
                        }
                    ]
                },
                {
                    loader: "source-map-loader",
                    test: /\.tsx?$/,
                    enforce: "pre"
                }
            ]
        }
    };
};
