const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    context: path.join(__dirname, 'src'),
    entry: {
        main: './main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { 
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                loaders: {
                  scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                  sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax'
                }
              }
            },
            { test: /\.js$/, loader: 'babel-loader', include: /src/ },
            { test: /\.html$/, loader: "html-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader?minimize", include: path.join(__dirname, 'src', 'css') },
            { test: /\.(pdf|json)$/, loader: "file-loader", include: path.join(__dirname, 'src', 'img') },
            { test: /\.(ttf)$/, loader: "file-loader", include: path.join(__dirname, 'src', 'fonts') },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
                  loader: 'image-webpack-loader',
                  query: {
                    mozjpeg: {
                      progressive: true,
                    },
                    optipng: {
                      optimizationLevel: 7,
                    },
                    pngquant: {
                      quality: '75-90',
                      speed: 3,
                    },
                  },
                }],
                exclude: /node_modules/,
                include: __dirname,
            }
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
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
}