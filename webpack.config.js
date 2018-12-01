const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
            extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
        },
        plugins: [
            new CleanWebpackPlugin([destinationPath]),
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
                        handler: 'cacheFirst'
                    },
                    {
                        urlPattern: new RegExp('.+manifest\.json'),
                        handler: 'cacheFirst'
                    },
                    {
                        urlPattern: new RegExp('.+\.(js|css|html|png|json)'),
                        handler: 'networkFirst'
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
                    test: /\.tsx$/,
                    enforce: "pre"
                }
            ]
        }
    };
};
