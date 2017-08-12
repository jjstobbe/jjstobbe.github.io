var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'cheap-module-source-map',
    context: path.join(__dirname, 'src'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', include: /src/ },
            { test: /\.css$/, loader: "style-loader!css-loader", include: path.join(__dirname, 'src', 'css') }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        stats: 'minimal'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
        })
    ]
}