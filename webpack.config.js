const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = {}) => {

    const isDev = env.dev;

    const PATHS = {
        root: path.resolve(__dirname, './'),
        nodeModules: path.resolve(__dirname, './node_modules'),
        src: path.resolve(__dirname, './src'),
        assets: path.resolve(__dirname, './src/assets'),
        dist: path.resolve(__dirname, './dist'),
        actions: path.resolve(__dirname, './src/actions'),
        reducers: path.resolve(__dirname, './src/reducers'),
    };

    const DEV_SERVER = {
        hot: true,
        hotOnly: true,
        overlay: true,
        //host: '0.0.0.0' //enable server access from the network(IP), not just localhost
    };

    return {
        devtool: isDev ? 'eval-source-map' : 'source-map',
        devServer: DEV_SERVER,
        entry: {
            app: [
                'react-hot-loader/patch',
                './src/index.tsx',
            ],
        },
        output: {
            path: PATHS.dist,
            filename: isDev ? '[name].js' : '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js',
            publicPath: '/',
        },
        resolve: {
            alias: {
                '@src': PATHS.src,
                '@actions': PATHS.actions,
                '@reducers': PATHS.reducers,
            },
            extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ],
            modules: [ 'src', 'node_modules' ],
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts)?$/,
                    include: [ PATHS.src, PATHS.nodeModules ],
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                compilerOptions: {
                                    'sourceMap': isDev,
                                    'target': 'es5',
                                    'isolatedModules': true,
                                    'noEmitOnError': false,
                                },
                            }
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: (!isDev ?
                        ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [ 'css-loader', 'sass-loader' ]
                        })
                        : [ 'style-loader', 'css-loader', 'sass-loader' ]
                    )
                },
                {
                    test: /\.(jpg|jpeg|png|gif|svg)$/,
                    include: [ PATHS.assets ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'icons/[name].[hash].[ext]',
                            limit: 1000,
                        },
                    },
                },
                {
                    test: /\.(woff|woff2|ttf|eot)$/,
                    include: [ PATHS.assets ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash].[ext]',
                        },
                    },
                },
            ],
        },
        plugins: [
            new WebpackMd5Hash(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
                },
            }),
            ...(!isDev ? [
                new ExtractTextPlugin('[name].[hash].bundle.css'),
                new OfflinePlugin({
                    caches: 'all',
                    ServiceWorker: {
                        events: true,
                        minify: false,
                    },
                }),
            ] : [])
        ]
    };
}
