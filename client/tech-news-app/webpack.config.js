const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [  {
                    loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "not_exist_path")
                ],
                loader: 'css-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}