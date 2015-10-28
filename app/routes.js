class Routes {
    constructor() {
        this.routes = [
            {path: '/', handler: 'goToToursFeeds', page: 'master'},
            {path: '/tours-:city/:tourName', handler: 'goToTourDetail', page: 'detail'}
        ];
    }

    getRoutes() {
        return this.routes;
    }
}

export default new Routes();
