class Routes {
    constructor() {
        this.routes = [
            {
                path: '/:language(en|es|fr)?',
                handler: 'goToToursFeeds',
                page: 'master'
            },
            {
                path: '/:language(en|es|fr)?/tours-:city/:tourName',
                handler: 'goToTourDetail',
                page: 'detail'
            }
        ];
    }

    getRoutes() {
        return this.routes;
    }
}

export default new Routes();
