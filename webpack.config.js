const path = require('path')

module.exports = {
    devtool: 'inline-sourcemap',
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
    }
}
