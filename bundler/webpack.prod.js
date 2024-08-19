const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(commonConfiguration, {
    mode: 'production',
    optimization: {
        usedExports: true,  // Enable tree shaking
        // sideEffects: false, // Ensure side effects are correctly configured
        splitChunks: {
            chunks: 'all',   // Enable code splitting
        },
        minimize: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8889,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     logLevel: 'info'
        // })
    ]
});
