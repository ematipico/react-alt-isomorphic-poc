// an Isomorphic helper
import Iso from 'iso';

import React from 'react';
import express from 'express';
import path from 'path';

import IsoApp from './app/app.jsx';
import Flux from './app/flux.js';
import ReactDOMServer from 'react-dom/server';

let app = express();

// Static directories to make css and js work
app.use('/build', express.static(path.join('build')))
app.use('/assets', express.static(path.join('assets')))

var seoTitle = 'City Wonders home page';
var seoDescription = 'City Wonders home page';
var seoKeywords = 'City,Wonders,Home,Page';


  let htmlEnd =  `
    <script src="/build/main.js"></script>
      </body>
    </html>
    `;

import routes from './app/routes.js';
routes.getRoutes().forEach((item) => {
    app.get(item.path, (req, res) => {
        let flux = new Flux();

        let RouteStore = flux.getStore('RouteStore');

        RouteStore[item.handler](req, item.page).then((SEO) => {

            seoTitle = SEO.title;
            seoDescription = SEO.description;
            seoKeywords = SEO.keywords;

            let htmlStart = `
              <!doctype html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>${seoTitle}</title>
                  <link rel="stylesheet" href="/assets/css/bootstrap.css" media="screen" title="no title" charset="utf-8">
                  <link rel="stylesheet" href="/assets/css/app.css" media="screen" title="no title" charset="utf-8">
                  <meta description="${seoDescription}">
                  <meta keywords="${seoKeywords}">
                </head>
                <body>
              `;

            // This creates the markup that we'll use to pass into Iso
            try {
                // console.dir(ReactDOMServer.renderToString(React.createElement(IsoApp, {flux: flux})))

                var markup = ReactDOMServer.renderToString(React.createElement(IsoApp, {flux: flux}));

                // here we use `alt.flush` in order to flush the data out of the stores
                // for the next request.

                var body = Iso.render(markup, flux.flush());
            } catch(e) {
                console.log(e)
            }
            // this is the part where iso kicks in.
            res.send(`${htmlStart}${body}${htmlEnd}`);

        }).catch(() => {

        });

    });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8081, () => {
  console.log('Listening on port 8081');
});
