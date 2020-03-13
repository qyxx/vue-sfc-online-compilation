const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');


module.exports = {
    module: {
        rules: [
            /*config.module.rule('js') */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]
    },
    resolve: {
        symlinks: false,
        extensions: [
            '.mjs',
            '.js',
            '.jsx',
            '.vue',
            '.json',
            'sass',
            '.wasm'
        ],
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: /.\/lib\/.*/
        })
    ]
};