module.exports = function(config) {
    config.set({
        basePath: '..',
        browsers: ['PhantomJS'],
        files: [
            {
                pattern: 'test/text-context.js',
                watched: true
            }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'test/text-context.js': ['webpack']
        },
        reporters: ['dots'],
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.jsx/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
};
