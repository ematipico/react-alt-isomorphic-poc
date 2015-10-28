import Alt from 'alt';
import AppActions from './actions/appActions.js';

import AppStore from './stores/appStore.js';
import RouteStore from './stores/routeStore.js';
import ToursFeedStore from './components/toursFeed/store.js';
import TourDetailStore from './components/tourDetail/store.js';

class Flux extends Alt {
    constructor() {
        super();
        // adding the actions
        this.addActions( 'AppActions',  AppActions);

        // adding the stores
        this.addStore('AppStore', AppStore);
        this.addStore('ToursFeedStore', ToursFeedStore);
        this.addStore('TourDetailStore', TourDetailStore);
        this.addStore('RouteStore', RouteStore);
    }
}

export default Flux;
