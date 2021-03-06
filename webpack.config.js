const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const jsdomRenderer = require('@prerenderer/renderer-jsdom');
const marked = require("marked");
const {highlight, languages} = require("prismjs");
require('prismjs/components/prism-bash');
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;

const paths = [
    '/',
    '/api/start',
    '/api/strategy',
    '/api/service',
    '/contribution',
    '/contacts'
];

const markedRenderer = new marked.Renderer();

markedRenderer.heading = (text, level) => `<h${level} class="title">${text}</h${level}>`;

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
        devtool: "source-map",
        watch,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            port: 9000,
            historyApiFallback: true,
            // shows build errors in browser if any
            overlay: true,
            // resources are in ./dist folder
            writeToDisk: true,
        },
        output: {
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].bundle.js',
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
                cleanOnceBeforeBuildPatterns: ["**/*"],
                dangerouslyAllowCleanPatternsOutsideProject: true,
                dry: false
            }),
            new webpack.DefinePlugin({
                'DEBUG': mode === 'development'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
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
                ignoreURLParametersMatching: [/./],
                offlineGoogleAnalytics: env.release === true,
                cleanupOutdatedCaches: true,
                include: [
                    /*...(env.watch === true ? [] : [/\.html$/]),*/
                    /\.js$/, /\.css$/, /\.svg$/, /\.png$/, /\.ico/
                ],
                runtimeCaching: [
                    {
                        urlPattern: new RegExp('.+w3schools.+\.css'),
                        handler: 'CacheFirst'
                    },
                    {
                        urlPattern: new RegExp('.+raw\.githubusercontent\.com.+CHANGELOG\.md'),
                        handler: 'CacheFirst'
                    }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {from: './resources/manifest.json', to: "./", flatten: true},
                    {from: './images', to: "./"}
                ],
                options: {
                    concurrency: 100
                }
            }),
            //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
            ...(!watch ? [new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                outputDir: path.join(__dirname, 'dist'),
                routes: [
                    '/',
                    '/api/start',
                    '/api/strategy',
                    '/api/service',
                    '/contribution',
                    '/contacts'
                ],
                renderer: new Renderer({
                    maxConcurrentRoutes: 4,
                    renderAfterElementExists: '.page-content',
                    headless: true
                })
            })] : []),
            new SitemapWebpackPlugin('https://www.advancedlogger.com', paths, {
                lastMod: true,
                changefreq: 'weekly',
                priority: '0.7'
            })
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
                    test: /\.(scss|css)$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader'},
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: ["./styles"]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.md$/,
                    use: [
                        {
                            loader: "html-loader"
                        },
                        {
                            loader: "markdown-loader",
                            options: {
                                renderer: markedRenderer,
                                highlight: code => {
                                    // Lets imagine that all bash scripts start with "npm" word :)
                                    if (code.startsWith("npm")) {
                                        return highlight(code, languages.bash, "sh");
                                    } else {
                                        return highlight(code, languages.javascript, "js")
                                            // "number" class has a conflict with bulma library
                                            .replace("token number", "token symbol");
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }
    };
};
