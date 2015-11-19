import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

import Iso from 'iso';
import Flux from './flux.js';

import polyfill from './components/localisation/intl-polyfill.js';
polyfill(['en', 'fr', 'es']);

var flux = new Flux();

Iso.bootstrap(function (state, meta, container) {
  flux.bootstrap(state);
  ReactDOM.render(
        <App flux={flux} locales={meta.locales} lang={meta.locale} />,
    // React.createElement(App, {flux: flux}),
    container
  );

});
