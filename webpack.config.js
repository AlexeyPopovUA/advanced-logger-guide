const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const jsdomRenderer = require('@prerenderer/renderer-jsdom');

const Renderer = jsdomRenderer;

module.exports = env => {
    console.log(env);

    const mode = env.prod ? 'production' : 'development';
    const destinationPath = 'dist';
    const watch = env.watch;
    const baseUrl = '/';

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
            contentBase: path.join(__dirname, 'dist'),
            port: 9000
        },
        output: {
            filename: '[name].js',
            chunkFilename: '[name].bundle.js',
            path: path.resolve(__dirname, destinationPath),
            publicPath: baseUrl
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
            new webpack.DefinePlugin({
                'DEBUG': mode === 'development',
                'WATCH': watch
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: './resources/index.html',
                filename: 'index.html',
                favicon: './images/favicon.ico',
                metadata: {
                    baseUrl
                },
                meta: {
                    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                    "theme-color": "#000000"
                },
                PRODUCTION: !!env.release,
                GOOGLE_ANALYTICS_SCRIPT: !!env.release ?
                    "<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-127711409-4\"></script>" : ""
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
            ...(!watch ? [new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                outputDir: path.join(__dirname, 'dist'),
                routes: [
                    '/',
                    '/api/start',
                    '/api/strategy',
                    "/api/service",
                    "/api/grouping",
                    "/releases",
                    "/contacts",
                    "/devpage"
                ],
                renderer: new Renderer({
                    maxConcurrentRoutes: 4,
                    renderAfterElementExists: '.page-content',
                    headless: true
                })
            })] : []),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|ts|tsx|)$/,
                    include: path.resolve('./src'),
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'babel-loader'
                    }]
                },
                {
                    test: /\.(png|svg|jpg|gif|woff(2)?|ttf|eot)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: ["./styles"]
                            }
                        }
                    ]
                }
            ]
        }
    };
};
