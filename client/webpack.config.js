/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

// const LodashModules = (() => {
//     const path = require('path'),
//           execSync = require('child_process').execSync;
 
//     const files = path.resolve(__dirname, './app/assets/javascripts'),
//           code = execSync(`grep -r "_\\\." ${files} --exclude=mathquill.js`,
//                           {encoding: 'utf-8'});
 
 
//     const matches = new Set(code.match(/_\.([a-z]+)/ig));
 
//     return Array.from(matches.values())
//                 .map(m => {
//                     let module = m.replace('_.', 'lodash.').toLowerCase(),
//                         vars = [m];
 
//                     if (module === 'lodash.extend') {
//                         module = 'lodash.assign';
//                         vars = vars.concat('_.assign');
//                     }
//                     if (module === 'lodash.each') {
//                         module = 'lodash.foreach';
//                         vars = vars.concat('_.forEach');
//                     }
 
//                     try {
//                         require.resolve(module);
//                     }catch(e) {
//                         console.log(`Installing ${module}`);
//                         execSync(`npm install --save ${module}`);
//                     }
 
//                     return new webpack.ProvidePlugin(
//                         _.fromPairs(vars.map(v => [v, module]))
//                     )
//                 })
// })();

var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.$": "jquery",
        "window.jQuery": "jquery",
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
        APP_ENV: JSON.stringify(APP_ENV),
        NODE_ENV: JSON.stringify(APP_ENV),
        'process.env.NODE_ENV': JSON.stringify(APP_ENV),
        'global.NODE_ENV': JSON.stringify(APP_ENV)
    })
];

switch (APP_ENV) {
    case 'production':
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
        plugins.push(new webpack.optimize.UglifyJsPlugin({compress: { screw_ie8: true, warnings: false }}));
        break;
    case 'development':
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new webpack.optimize.AggressiveMergingPlugin());
         plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
        break;
    default:
        break;
}

var config = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        //'webpack-dev-server/client?http://txslfdwda1v:3000',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: 'public',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public',
        hot: true
    },
    resolve: {
        root: path.resolve('./')
    },
    devtool: "#eval-source-map",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            { test: /\.less$/, loader: "style!css!less"},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192' },
            { test: /\.json$/, loader: "json"}
        ]
    },
    resolveUrlLoader: {
        absolute: true
    },
    plugins: plugins,
    node: {
        fs: 'empty',
        net: 'empty',
        dns: 'empty'
    },
    externals: [
                {'./cptable': 'var cptable'}
            ]
};

if (APP_ENV !== 'developement') {
    delete config.devServer;
}

if (APP_ENV === 'production' || APP_ENV === 'staging') {
    config.entry = [
        'babel-polyfill',
        './src/index.js'
    ];
}

module.exports = config;
