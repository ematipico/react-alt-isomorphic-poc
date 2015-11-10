import Alt from 'alt';
import AppActions from './actions/appActions.js';

import AppStore from './stores/appStore.js';
import RouteStore from './stores/routeStore.js';
import ToursFeedStore from './components/toursFeed/store.js';
import TourDetailStore from './components/tourDetail/store.js';
import CategoryFilterStore from './components/categoryFilter/store.js';
import SorterStore from './components/sorter/store.js';
import LocalisationStore from './components/localisation/store.js';

class Flux extends Alt {
    constructor(lang, locales) {
        super();
        this.locale = lang;
        this.locales = locales;
        // adding the actions
        this.addActions( 'AppActions',  AppActions);

        // adding the stores
        this.addStore('AppStore', AppStore);
        this.addStore('ToursFeedStore', ToursFeedStore);
        this.addStore('TourDetailStore', TourDetailStore);
        this.addStore('RouteStore', RouteStore);
        this.addStore('CategoryFilterStore', CategoryFilterStore);
        this.addStore('SorterStore', SorterStore);
        this.addStore('LocalisationStore', LocalisationStore);
        this.getStore('LocalisationStore').loadLocale(this.locale);
    }
}

export default Flux;
