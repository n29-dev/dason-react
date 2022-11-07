const path = require('path');
const Dotenv = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPluin = require('mini-css-extract-plugin');
/* eslint import/no-unresolved: [2, { caseSensitiveStrict: true }] */
const tailwindCss = require('tailwindcss');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]',
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        hot: true,
        open: true,
        compress: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            [
                                '@babel/preset-react',
                                {
                                    runtime: 'automatic',
                                },
                            ],
                        ],
                    },
                },
            },

            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPluin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env', tailwindCss],
                            },
                        },
                    },
                ],
            },

            {
                test: /\.svg/,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ],
    },

    plugins: [
        new ESLintPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/public/index.html'),
            title: 'Webpack React Setup',
            favicon: './src/public/assets/images/favicon.ico',
            filename: 'index.html',
        }),

        new MiniCssExtractPluin({
            filename: 'style.css',
        }),
        new Dotenv({
            systemvars: true,
        }),
    ],

    resolve: {
        extensions: ['.js', '.json', '.jsx', '.png', '.svg', 'jpg', 'jpeg'],
        alias: {
            Images: path.resolve(__dirname, 'src/public/assets/images'),
        },
    },
};
