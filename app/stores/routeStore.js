import Alt from '../alt';

class RouteStore {
    constructor(counter) {
        this.AppActions = this.alt.getActions('AppActions');
		this.bindActions(this.AppActions);

        this.currentView = 'master';

        this.exportPublicMethods({
            goToToursFeeds: this.goToToursFeeds.bind(this, this.AppActions),
            goToTourDetail: this.goToTourDetail.bind(this, this.AppActions),
            getCurrentView: this.getCurrentView.bind(this)
        });
    }

    goToToursFeeds(actions, ctx, page) {
        return actions.toursFeeds().then(() => {
            this.setState({
                currentView: page
            })
            return new Promise((resolve) => {
                resolve({
                    description: "City Wonders home page",
                    title: "City Wonders",
                    keywords: "City,Wonders,Home,Page,Tours"
                });
            })
        }.bind(this));

    }

    goToTourDetail(actions, ctx, page) {
        var city = ctx.params.city;
        var tourName = ctx.params.tourName;
        return actions.tourDetail(city, tourName).then((SEO) => {
            this.setState({
                currentView: page
            });
            return new Promise((resolve) => {
                resolve(SEO);
            })
        }.bind(this));
    }

    getCurrentView() {
        return this.currentView;
    }

}

export default RouteStore;
