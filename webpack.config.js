/**
 * Created by Denis on 19.06.2017.
 */
const path = require('path'),
    webpack = require('webpack');

let config = function (env) {
    env = env || '';

    let config = {
        entry: './app.js',
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist')
        },
        module:{
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react']
                        }
                    }
                }
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env.build || 'production')
            }),
        ],
        devServer: {
            historyApiFallback: true
        }
    };

    return config;
};

module.exports = config;