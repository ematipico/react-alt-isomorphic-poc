const loaders = {
  en(callback, force = false) {
    if (!window.Intl || force) {
      require.ensure([
        'intl',
        'intl/locale-data/jsonp/en.js',
        './locales/en.js'
      ], (require) => {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        const lang = require('./locales/en.js');
        return callback(lang);
      });
    } else {
      require.ensure(
        ['./locales/en.js'],
        (require) => callback(require('./locales/en.js'))
      );
    }
  },

  fr(callback, force = false) {
    if (!window.Intl || force) {
      require.ensure([
        'intl',
        'intl/locale-data/jsonp/fr.js',
        './locales/fr.js'
      ], (require) => {
        require('intl');
        require('intl/locale-data/jsonp/fr.js');
        const lang = require('./locales/fr.js');
        return callback(lang);
      });
    } else {
      require.ensure(
        ['./locales/fr.js'],
        (require) => callback(require('./locales/fr.js'))
      );
    }
  }

};

export default (locale, force) => {
  return new Promise((resolve) => {
    return loaders[locale]((result) => {
      // We need to define `ReactIntl` on the global scope
      // in order to load specific locale data from `ReactIntl`
      // see: https://github.com/iam4x/isomorphic-flux-boilerplate/issues/64
      if (process.env.BROWSER) window.ReactIntl = require('react-intl');
      return resolve(result);
    }, force);
  });
};
