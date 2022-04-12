const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const jsdomRenderer = require('@prerenderer/renderer-jsdom');
const {marked} = require("marked");
const {highlight, languages} = require("prismjs");
require('prismjs/components/prism-bash');
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;
const ESLintPlugin = require("eslint-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const babelPlugins = require("./babel.config").plugins;

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
    const mode = env.production ? "production" : "development";
    const destinationPath = "dist";
    const watch = !!env.WEBPACK_SERVE;
    const DEBUG = mode === "development";
    const RELEASE = env.release === "release";
    const baseUrl = "/";

    return {
        //stats: 'verbose',
        stats: {
            children: true
        },
        entry: {
            index: './src/index.tsx'
        },
        target: "web",
        mode,
        devtool: "source-map",
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        },
        devServer: {
            devMiddleware: {
                writeToDisk: true
            },
            port: 9000,
            // supports browser routing like "/this/is/browser/route"
            historyApiFallback: true,
            // Hot Module Reloading (HMR) is always enabled in the watch mode
            hot: watch,
            compress: true,
            client: {
                logging: "info",
                progress: true,
                reconnect: 5,
                overlay: {
                    errors: true
                }
            }
        },
        output: {
            filename: '[name].[contenthash].js',
            chunkFilename: "[name].[chunkhash].bundle.js",
            path: path.resolve(__dirname, destinationPath),
            publicPath: "/"
        },
        resolve: {
            extensions: [".js", ".mjs", ".ts", ".tsx", ".scss", ".css", ".json"]
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
                favicon: './images/favicon.ico',
                template: './resources/index.html',
                filename: 'index.html',
                minify: !DEBUG
                    ? {
                        collapseWhitespace: true,
                        collapseInlineTagWhitespace: true,
                        removeComments: true,
                        removeRedundantAttributes: true
                    }
                    : false,
                PRODUCTION: !!env.release,
                GOOGLE_ANALYTICS_SCRIPT: !!env.release ?
                    "<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-127711409-4\"></script>" : "",
                meta: {
                    charset: {
                        charset: "UTF-8"
                    },
                    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                    compatible: {
                        "http-equiv": "X-UA-Compatible",
                        content: "IE=edge"
                    },
                    description: {
                        name: "description",
                        content: "Guide with examples for the advanced-logger npm module"
                    }
                },
                metadata: {
                    baseUrl
                }
            }),
            //It's a Workbox service worker plugin
            //@see https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
            ...(!watch
                ? [
                    new GenerateSW({
                        include: [
                            /\.js$/,
                            /\.css$/,
                            /\.svg$/,
                            /\.xml$/,
                            /\.json$/,
                            /\.png$/,
                            /\.ico/
                        ],
                        // update SW often when not a release
                        swDest: `service-worker.js`,
                        sourcemap: true,
                        cleanupOutdatedCaches: true,
                        // See https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#clientsclaim
                        clientsClaim: !RELEASE,
                        ignoreURLParametersMatching: [/.*/],
                        runtimeCaching: [
                            {
                                urlPattern: new RegExp(".+\.png$"),
                                handler: "CacheFirst"
                            },
                            {
                                urlPattern: new RegExp('.+w3css\/4\/w3\.css$'),
                                handler: "CacheFirst"
                            },
                            {
                                urlPattern: new RegExp('.+raw\.githubusercontent\.com.+CHANGELOG\.md'),
                                handler: 'CacheFirst'
                            }
                        ]
                    })
                ]
                : []),
            new CopyWebpackPlugin({
                patterns: [
                    {from: './resources/manifest.json'},
                    {from: './images'}
                ],
                options: {
                    concurrency: 100
                }
            }),
            new SitemapWebpackPlugin({
                base: 'https://www.advancedlogger.com',
                paths: paths.map(path => ({
                    path,
                    lastMod: new Date().toISOString().slice(0, 10),
                    changeFreq: 'weekly',
                    priority: 0.7
                }))
            }),
            new webpack.DefinePlugin({
                DEBUG,
                RELEASE
            }),
            new ESLintPlugin(),
            ...(watch ? [new ReactRefreshWebpackPlugin()]: []),/*,
            new BundleAnalyzerPlugin()*/
        ],
        module: {
            rules: [
                {
                    test: /\.(js|ts|tsx)$/,
                    include: path.resolve("./src"),
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                                configFile: path.resolve(__dirname, "babel.config.js"),
                                plugins: watch ? [...babelPlugins, require.resolve('react-refresh/babel')] : babelPlugins,
                            }
                    }
                },
                {
                    test: /\.(png|jpg|gif|woff|woff2|ttf|eot)$/,
                    include: [
                        path.resolve("./src"),
                        path.resolve("./resources"),
                        path.resolve("./images"),
                        path.resolve("./styles")
                    ],
                    use: [
                        {
                            loader: "file-loader"
                        }
                    ]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        // HMR is working only with style-loader, but not with MiniCssExtractPlugin.loader (not sure why)
                        DEBUG ? "style-loader" : MiniCssExtractPlugin.loader,
                        { loader: "css-loader" },
                        {
                            loader: "sass-loader",
                            options: {
                                sassOptions: {
                                    includePaths: ["./sass", "./src"]
                                }
                            }
                        },
                        { loader: "postcss-loader" }
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
                },
                {
                    test: /\.svg$/,
                    include: [
                        path.resolve("./src"),
                        path.resolve("./resources"),
                        path.resolve("./styles"),
                        path.resolve("./images")
                    ],
                    use: ["@svgr/webpack", "url-loader"]
                }
            ]
        }
    };
};
