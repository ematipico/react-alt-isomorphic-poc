var gulp = require('gulp');
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var webpack = require("webpack");
var path = require('path');
var sass = require('gulp-sass');

var configWebpack = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        // new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    module: {
      loaders: [
          {
              test: /\.json?$/,
              loader: 'json'
          },
          {
              test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
              loader: 'babel' // The module to load. "babel" is short for "babel-loader"
          }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}
gulp.task("webpack", function(callback) {
    // run webpack
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css/'));

    webpack(configWebpack, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

// gulp.task("tests", function(callback) {
//     // console.log(path.resolve(__dirname + 'test/karma.conf.js'))
//     new KarmaServer({
//     configFile: path.resolve(__dirname, 'test/karma.config.js'),
//     singleRun: false
//   }, callback).start();
// });

gulp.task("server", ["webpack"], function(callback) {
    shell('babel-node server.js');
    callback();
});
