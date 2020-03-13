const path = require('path');
const common = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: "production", //production
    entry: {
        'producer': './src/main.js',
    }
});