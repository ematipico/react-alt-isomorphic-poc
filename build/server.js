// an Isomorphic helper
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _babelCoreRegister = require('babel-core/register');

var _babelCoreRegister2 = _interopRequireDefault(_babelCoreRegister);

var _iso = require('iso');

var _iso2 = _interopRequireDefault(_iso);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appAppJsx = require('../app/app.jsx');

var _appAppJsx2 = _interopRequireDefault(_appAppJsx);

var _appFluxJs = require('../app/flux.js');

var _appFluxJs2 = _interopRequireDefault(_appFluxJs);

var _reactDomServer = require('react-dom/server');

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var _appRoutesJs = require('../app/routes.js');

var _appRoutesJs2 = _interopRequireDefault(_appRoutesJs);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _appComponentsLocalisationIntlPolyfillJs = require('../app/components/localisation/intl-polyfill.js');

var _appComponentsLocalisationIntlPolyfillJs2 = _interopRequireDefault(_appComponentsLocalisationIntlPolyfillJs);

(0, _appComponentsLocalisationIntlPolyfillJs2['default'])(['en', 'fr', 'es']);

var app = (0, _express2['default'])();

// Static directories to make css and js work
app.use('/build', _express2['default']['static'](_path2['default'].join('build')));
app.use('/assets', _express2['default']['static'](_path2['default'].join('assets')));
app.use('/data', _express2['default']['static'](_path2['default'].join('data')));

// localisation part
_i18n2['default'].configure({
    locales: ['en', 'fr', 'es'],
    directory: _express2['default']['static'](_path2['default'].join('locales')),
    defaultLocale: 'en'
});

app.use(_i18n2['default'].init);

var seoTitle = 'City Wonders home page';
var seoDescription = 'City Wonders home page';
var seoKeywords = 'City,Wonders,Home,Page';

var htmlEnd = '\n    <script src="/build/main.js"></script>\n      </body>\n    </html>\n    ';

app.get('/en', function (req, res) {
    res.redirect('/');
});

_appRoutesJs2['default'].getRoutes().forEach(function (item) {
    app.get(item.path, function (req, res) {
        var language = req.params.language || 'en';
        var flux = new _appFluxJs2['default'](language, ['en', 'fr', 'es']);
        req.setLocale(language);
        var RouteStore = flux.getStore('RouteStore');

        RouteStore[item.handler](req, item.page).then(function (SEO) {

            seoTitle = SEO.title;
            seoDescription = SEO.description;
            seoKeywords = SEO.keywords;

            var htmlStart = '\n              <!doctype html>\n              <html>\n                <head>\n                  <meta charset="utf-8">\n                  <title>' + seoTitle + '</title>\n                  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n                  <link rel="stylesheet" href="/assets/css/bootstrap.css" media="screen" title="no title" charset="utf-8">\n                  <link rel="stylesheet" href="/assets/css/app.css" media="screen" title="no title" charset="utf-8">\n                  <script src="/assets/js/jquery.min.js"></script>\n                  <script src="/assets/js/bootstrap.min.js"></script>\n                  <meta description="' + seoDescription + '">\n                  <meta keywords="' + seoKeywords + '">\n                </head>\n                <body>\n              ';

            // This creates the markup that we'll use to pass into Iso
            try {
                // console.dir(ReactDOMServer.renderToString(React.createElement(IsoApp, {flux: flux})))
                var markup = _reactDomServer2['default'].renderToString(_react2['default'].createElement(_appAppJsx2['default'], { flux: flux, locales: ['en', 'fr', 'es'], lang: req.getLocale() }));

                // here we use `alt.flush` in order to flush the data out of the stores
                // for the next request.
                var body = _iso2['default'].render(markup, flux.flush(), {
                    locales: ['en', 'fr', 'es'],
                    locale: req.getLocale()
                });
            } catch (e) {
                console.log(e);
            }
            // this is the part where iso kicks in.
            res.send('' + htmlStart + body + htmlEnd);
        })['catch'](function () {});
    });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8081, function () {
    console.log('Listening on port 8081');
});
//# sourceMappingURL=server.js.map
