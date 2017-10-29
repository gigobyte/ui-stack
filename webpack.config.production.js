const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        content: path.resolve(__dirname, 'src', 'content.ts'),
        popup: path.resolve(__dirname, 'src', 'popup.ts'),
        checker: path.resolve(__dirname, 'src', 'checker.ts')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.ts']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
}
