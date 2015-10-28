import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

import Iso from 'iso';
import Flux from './flux.js';
var flux = new Flux();

Iso.bootstrap(function (state, meta, container) {

  flux.bootstrap(state);
console.log(container)
  ReactDOM.render(
    <App flux={flux} />,
    container
  );

});
