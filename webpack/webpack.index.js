
var dirVars = require('./webpack-base/dir-vars.config.js');
var commonConf = require('./webpack-base/common.config.js');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var BUILD_PATH = dirVars.distDir;

commonConf.entry = {
    index: path.resolve(dirVars.pagesDir, './index.js')
};

commonConf.output = {
    path: BUILD_PATH,
    filename: '[name]-[hash].js'
};

commonConf.devServer = {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8001,
};

var htmlPlugin = new HtmlwebpackPlugin({
    title: '日期计算器',
    filename: 'index.html',
    template: path.resolve(dirVars.srcRootDir, "./templates/template.html"),
});

commonConf.plugins.push(htmlPlugin);

module.exports = commonConf;